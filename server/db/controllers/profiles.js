import mongoose, { Schema } from 'mongoose';
import Profile from '../models/profile';

/**
 * List
 */
export function me(req, res) {
  console.log('profile controller')
  console.log(req.user)
  console.log('profile id: ' + req.user.profile_id)
  console.log('profile controller')

  const query = {"_id": mongoose.Types.ObjectId(req.user.profile_id)};
  
  Profile.findOne(query).exec( (err, profile) => {
    if (!profile || err || !req.user.profile_id) {
      console.log('Error in "profile/me" query');
      if (!req.user.profile_id)  return res.status(500).send({error: 'req.user.profile_id: ' + req.user.profile_id});
      if (err) return res.status(500).send({error: 'Profile resource not found: ' + err.value});
      return res.status(500).send({error:  + ' does not have a resource'});
    }

    return res.json(profile);
  });
}

export function update(req, res) {
  const query = { _id: req.body._id };
  const omitKeys = ['id', '_id', '_v'];
  const data = _.omit(req.body, omitKeys);

  return Profile.findOneAndUpdate(query, data, (err, profile) => {
    if (err) {
      return res.status(500).send({error: err.response.status});
    }

    return res.status(200).json(profile);
  });
}

export default {
  me,
  update
};
