import mongoose, { Schema } from 'mongoose';
import { Profile } from './profile';

const ProjectSchema = new mongoose.Schema({
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  name: { type: String, default: '', required: true },
  projectUrl: { type: String, default: ''},
  description: { type: String, default: '', required: true },
  startDate: {type: Date, required: true},
  endDate: {type: Date},
  current: {type: Boolean, required: true, default: false },
}, {timestamps: true});

export default mongoose.model('Project', ProjectSchema);