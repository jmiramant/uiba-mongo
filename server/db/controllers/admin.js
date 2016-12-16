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

export function deleteUser(req, res) {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) handleError(res, err)
    if (!user || !user.profile_id) handleError(res, "No user was found with this id.")
    Profile.findOne({"_id": user.profile_id}, (profErr, profile) => {
      if (err) handleError(res, profErr)
      if (!profile) handleError(res, "this user doesn't have a profile associated with it")
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
        profile: (cb) => {
          Profile.remove({
            '_id': profId
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
          })
        },
        user: (cb) => {
          User.remove({
            'email': req.body.email
          }, (err) => {
            cb(err)
          })
        }
      }
      async.parallel(parallels, (err, resp) => {
        console.log(err, resp)
        if (err) handleError(res, err)
        res.status(200).send('User: ' + req.body.email + " deleted.")
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
  deleteUser
};