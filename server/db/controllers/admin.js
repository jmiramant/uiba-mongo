import mongoose, {
  Schema
} from 'mongoose';
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
import async from 'async'
import moment from 'moment';
import _ from 'lodash';

const handleError = (res, err) => {
  return res.status(404).json({
    message: err
  });
}

export function deleteUser(req, res) {
  const id = mongoose.Types.ObjectId(req.params.profile_id);

  const parallels = {
    school: School.remove({
      'profile_id': id
    }),
    skill: Skill.remove({
      'profile_id': id
    }),
    project: Project.remove({
      'profile_id': id
    }),
    job: Job.remove({
      'profile_id': id
    }),
    language: Language.remove({
      'profile_id': id
    }),
    interest: Interest.remove({
      'profile_id': id
    }),
    profile: Profile.remove({
      '_id': id
    })
  }
  async.parallel(parallels, (err, resp) => {
    if (err) handleError(res, err)
    res.status(200).send(resp)
  })
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
