import mongoose, {
  Schema
} from 'mongoose';
import Role from '../models/role';
import Profile from '../models/profile';

export function list(req, res) {

  Role.findById(req.params.id, (err, role) => {
    Profile.find({
      '_id': {
        '$in': role.applicants
      }
    }).exec((err, profiles) => {
      if (err) return res.status(404).send({
        error: 'Profile resource not found: ' + err.value
      });
      if (!profiles) return res.status(401).send({
        error: 'Profile does not have a resource'
      });
      return res.json(profiles);
    });

  });
}

export default {
  list,
};