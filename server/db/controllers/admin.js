import mongoose, {
  Schema
} from 'mongoose';
import User from '../models/user';
import School from '../models/school';
import Profile from '../models/profile';
import Project from '../models/project';
import Skill from '../models/skill';
import Job from '../models/job';
import Interest from '../models/interest';
import Language from '../models/language';
import Company from '../models/company';
import Recruiter from '../models/recruiter';
import Recovery from '../models/recovery';
import Role from '../models/role';
import async from 'async'
import moment from 'moment';
import _ from 'lodash';

const handleError = (res, err) => {
  console.log(err)
  return res.status(404).json({
    message: err
  });
}

export function authorizeEmails(req, res) {
  const emails = req.body.emails.split(',')

  User.find({'email': {$in: emails } }).exec( (uErr, users) => {
    if (uErr || users.length === 0) return res.status(404).send('There are no users found with these emails.');

    const parallels = [];

    _.forEach(users, (user, i) => {
      user.isEmailVerified = true;
      parallels.push(user.save)
    });

    async.parallel(parallels, (err, resp) => {
      if (err) return res.status(404).send('Something went wrong autherizing emails.');
      return res.status(200).send(resp);
    });

  });

}

export function deleteUser(req, res) {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return handleError(res, err)
    if (!user || !user.profile_id) return handleError(res, "No user was found with this id.")
    Profile.findOne({"_id": user.profile_id}, (profErr, profile) => {
      if (profErr) return handleError(res, profErr);
      if (!profile) {
        User.remove({
          'email': req.body.email
        }, (uErr) => {
          if (uErr) return handleError(res, uErr);
          return res.status(200).send('User: ' + req.body.email + " deleted.")
        })
      }
      const profId = profile._id;
      const parallels = {
        school: (cb) => {
          School.remove({
            'profile_id': profId
          }, (err) => {
            cb(err)
          });
        },
        skill: (cb) => {
          Skill.remove({
            'profile_id': profId
          }, (err) => {
            cb(err)
          });
        },
        project: (cb) => {
          Project.remove({
            'profile_id': profId
          }, (err) => {
            cb(err)
          });
        },
        job: (cb) => {
          Job.remove({
            'profile_id': profId
          }, (err) => {
            cb(err)
          });
        },
        language: (cb) => {
          Language.remove({
            'profile_id': profId
          }, (err) => {
            cb(err)
          });
        },
        interest: (cb) => {
          Interest.remove({
            'profile_id': profId
          }, (err) => {
            cb(err)
          });
        },
        roles: (cb) => {
          Role.update({
            applicants: profId
          }, {
            $pullAll: {
              applicants: [profId]
            }
          }).exec((err) => {
            cb(err)
          })
        },
        recruiters: (cb) => {
          Recruiter.update({
            'credit.candidate': profId
          }, {
            $pullAll: {
              'credit.$.candidate': [profId]
            }
          }).exec((err) => {
            cb(err)
          })
        },
        profile: (cb) => {
          Profile.remove({
            '_id': profId
          }, (err) => {
            cb(err)
          });
        },
        user: (cb) => {
          User.remove({
            'email': req.body.email
          }, (err) => {
            cb(err)
          })
        }
      }
      async.series(parallels, (_err, resp) => {
        if (_err) return handleError(res, _err)
        return res.status(200).send('User: ' + req.body.email + " deleted.")
      })

    });
  });

}


export function recovery(req, res) {
  Recovery.create({
    profile_id: mongoose.Types.ObjectId(req.user.profile_id),
    user_id: mongoose.Types.ObjectId(req.user._id),
    recruiter_key: req.body.recruiterKey.toString(),
  }, function(err, recovery) {
    if (err) return handleError(err);

    return res.json(recovery);
  })
}

export default {
  recovery,
  deleteUser,
  authorizeEmails
};
