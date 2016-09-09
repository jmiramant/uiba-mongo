import mongoose, { Schema } from 'mongoose';
import { User } from './user';
import { Job } from './job';

const ProfileSchema = new mongoose.Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  name: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, default: '' },
  headline: { type: String, default: '' },
  gender: { type: String, default: '' },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  picture: { type: String, default: '' },
  service: { type: String, enum: ['linkedin', 'email', 'google'] }
}, {timestamps: true});

ProfileSchema.statics = {};

export default mongoose.model('Profile', ProfileSchema);
