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

export default {
  me,
};
