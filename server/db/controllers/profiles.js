import mongoose, { Schema } from 'mongoose';
import Profile from '../models/profile';

/**
 * List
 */
export function me(req, res) {
  Profile.findOne({"user_id": mongoose.Types.ObjectId(req.user._id)}).exec((err, profile) => {
    if (err) {
      console.log('Error in "profile/me" query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(profile);
  });
}

export function update(req, res) {
  const query = { _id: req.body._id };
  const omitKeys = ['id', '_id', '_v'];
  const data = _.omit(req.body, omitKeys);

  return Profile.findOneAndUpdate({"_id": req.body._id}, data, (err, profile) => {
    if (err) {
      console.log('Error on save!');
      return res.status(500).send('We failed to save for some reason');
    }

    return res.status(200).json(profile);
  });
}

export default {
  me,
  update
};
