import mongoose from 'mongoose';
import parallel from 'async/parallel';
import _ from 'lodash';
import Role from '../models/role';
import Profile from '../models/profile';
import Address from '../models/address';
import School from '../models/school';
import Skill from '../models/skill';

export function list(req, res) {
  Role.findById(req.params.id, (err, role) => {
    const roleOids = role.applicants.map((applicantId) => {
      return mongoose.Types.ObjectId(applicantId); // eslint-disable-line new-cap
    });

    const containsId = {
      $in: roleOids
    };

    const profApplicants = {
      profile_id: containsId
    };

    const asyncTasks = {
      profile: (cb) => {
        Profile.find({
          _id: containsId,
          'apply.applyComplete': true
        }, (_err, profs) => {
          cb(_err, profs);
        });
      },
      address: (cb) => {
        Address.find(profApplicants, (_err, addresses) => {
          cb(_err, addresses);
        });
      },
      school: (cb) => {
        School.find(profApplicants, (_err, schools) => {
          cb(_err, schools);
        });
      },
      skill: (cb) => {
        Skill.find(profApplicants, (_err, skills) => {
          cb(_err, skills);
        });
      }
    };

    parallel(asyncTasks, (_err, results) => {
      if (_err) {
        return res.status(404).send({
          error: 'Profile resource not found: ' + _err.value
        });
      }

      if (!results.profile) {
        return res.status(401).send({
          error: 'Profile does not have a resource'
        });
      }

      const resp = [...results.profile];
      const struct = [];

      _.forEach(resp, (prof) => {
        const _prof = Object.assign({ filterData: {} }, prof._doc);

        // eslint-disable-next-line dot-notation
        _prof.filterData['skill'] = _.filter(results.skill, (obj) => {
          return _prof._id.toString() === obj.profile_id.toString();
        });

        const f = _.filter(results.school, (obj) => {
          return _prof._id.toString() === obj.profile_id.toString();
        });
        // eslint-disable-next-line dot-notation
        _prof.filterData['school'] = _.map(f, (school) => {
          return school.degree;
        });

        const _res = _.filter(results.address, (obj) => {
          return _prof._id.toString() === obj.profile_id.toString();
        });
        // eslint-disable-next-line dot-notation
        _prof.filterData['address'] = _.map(_res, (addr) => { return addr.zip_code; });

        struct.push(_prof);
      });
      return res.json(struct);
    });
  });
}

export function listByCompanyId(req, res) {
  const cid = req.params.companyId;
  // eslint-disable-next-line new-cap
  Profile.find({
    'apply.company_id': mongoose.Types.ObjectId(cid), // eslint-disable-line new-cap
    'apply.applyComplete': true,
  }).exec((err, profiles) => { // eslint-disable-line consistent-return
    if (err) {
      return res.status(500).send({
        message: 'invalid companys list request: ' + err.value
      });
    }

    const profOids = profiles.map((app) => {
      return mongoose.Types.ObjectId(app._id); // eslint-disable-line new-cap
    });

    const containsId = {
      $in: profOids
    };

    const profApplicants = {
      profile_id: containsId
    };

    const asyncTasks = {
      address: (cb) => {
        Address.find(profApplicants, (_err, addresses) => {
          cb(_err, addresses);
        });
      },
      school: (cb) => {
        School.find(profApplicants, (_err, schools) => {
          cb(_err, schools);
        });
      },
      skill: (cb) => {
        Skill.find(profApplicants, (_err, skills) => {
          cb(_err, skills);
        });
      },
      role: (cb) => {
        Role.find({applicants: containsId}, (_err, roles) => {
          cb(_err, roles);
        });
      }
    };

    parallel(asyncTasks, (_err, results) => {
      if (_err) {
        return res.status(404).send({
          error: 'Profile resource not found: ' + _err.value.toString()
        });
      }

      const resp = [...profiles];
      const struct = [];

      _.forEach(resp, (prof) => {
        const _prof = Object.assign({ filterData: {} }, prof._doc);

        const r = _.find(results.role, (_r) => { // eslint-disable-line consistent-return
          return _r.applicants.indexOf(_prof._id) !== -1;
        });

        _prof.role = undefined;
        if (r) {
          _prof.role = { _id: r._id, title: r.title, description: r.description };
        }

        // eslint-disable-next-line dot-notation
        _prof.filterData['skill'] = _.filter(results.skill, (obj) => {
          return _prof._id.toString() === obj.profile_id.toString();
        });

        const f = _.filter(results.school, (obj) => {
          return _prof._id.toString() === obj.profile_id.toString();
        });
        // eslint-disable-next-line dot-notation
        _prof.filterData['school'] = _.map(f, (school) => {
          return school.degree;
        });

        const _res = _.filter(results.address, (obj) => {
          return _prof._id.toString() === obj.profile_id.toString();
        });
        // eslint-disable-next-line dot-notation
        _prof.filterData['address'] = _.map(_res, (addr) => { return addr.zip_code; });

        return struct.push(_prof);
      });
      return res.json(struct);
    });
  });
}


export default {
  list,
  listByCompanyId,
};
