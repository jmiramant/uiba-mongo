import mongoose, {
  Schema
} from 'mongoose';
import _ from 'lodash';
import request from 'request';
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

    const roleIds = role.applicants.map( (applicantId) => {
      return applicantId
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
        
        _prof.filterData['skill'] = _.filter(results.skill, (obj) => { 
          return _prof._id.toString() === obj.profile_id.toString()
        });

        const f = _.filter(results.school, (obj) => { 
          return _prof._id.toString() === obj.profile_id.toString()
        })
        _prof.filterData['school'] = _.map(f, (school) => {
          return school.degree;
        });

        let addr = ''
        const res = _.filter(results.address, (obj) => { 
          return _prof._id.toString() === obj.profile_id.toString()
        })[0];
        if (res) addr = res.zip_code;
        _prof.filterData['address'] = addr

        struct.push(_prof) 
      })
      return res.json(struct)
    });

  });
}

export default {
  list,
};