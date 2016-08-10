import mongoose, { Schema } from 'mongoose';
import { User } from './user';
import { Job } from './job';

const ProfileSchema = new mongoose.Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  name: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  headline: { type: String, default: '' },
  gender: { type: String, default: '' },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  picture: { type: String, default: '' }, 
  jobs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Job'}]
}, {timestamps: true});

ProfileSchema.statics = {};

export default mongoose.model('Profile', ProfileSchema);
