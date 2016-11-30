import mongoose, {
  Schema
} from 'mongoose';
import _ from 'lodash';
import Role from '../models/role';
import Profile from '../models/profile';
import Address from '../models/address';
import School from '../models/school';
import Skill from '../models/skill';
import parallel from 'async/parallel';

export function list(req, res) {

  Role.findById(req.params.id, (err, role) => {

    const roleOids = role.applicants.map( (applicantId) => {
      return mongoose.Types.ObjectId(applicantId)
    })

    const containsId = {
      '$in': roleOids
    };

    const profApplicants = {
      'profile_id': containsId
    };

    const asyncTasks = {
      profile: (cb) => {
        Profile.find({
          '_id': containsId
        }, (err, profs) => {
          cb(err, profs)
        })
      },
      address: (cb) => {
        Address.find(profApplicants, (err, addresses) => {
          cb(err, addresses)
        });
      },
      school: (cb) => {
        School.find(profApplicants, (err, schools) => {
          cb(err, schools)
        });
      },
      skill: (cb) => {
        Skill.find(profApplicants, (err, skills) => {
          cb(err, skills)
        });
      }
    }

    parallel(asyncTasks, (err, results) => {
      if (err) return res.status(404).send({
        error: 'Profile resource not found: ' + err.value
      });

      if (!results.profile) return res.status(401).send({
        error: 'Profile does not have a resource'
      });

      const resp = [...results.profile];
      const struct = []

      _.forEach(resp, (prof) => {
        const _prof = Object.assign({ filterData: {} }, prof._doc);
        _.forEach(results, (v, k) => {
          switch (k) {
            case 'skill':
              _prof.filterData[k] = _.filter(v, (obj) => { 
                return _prof._id.toString() === obj.profile_id.toString()
              });
              break;
            case 'school': 
              const f = _.filter(v, (obj) => { 
                return _prof._id.toString() === obj.profile_id.toString()
              })
              _prof.filterData[k] = _.map(f, (school) => {
                return school.degree;
              });
              break;
            case 'address':
              let addr = ''
              const res = _.filter(v, (obj) => { 
                return _prof._id.toString() === obj.profile_id.toString()
              })[0];
              if (res) addr = res.zip_code
              _prof.filterData[k] = addr
              break;
          }
        });
        struct.push(_prof) 
      })
      return res.json(struct)
    });

  });
}

export default {
  list,
};