import mongoose, { Schema } from 'mongoose';
import { User } from './user';

const ProjectSchema = new mongoose.Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: '', required: true },
  projectUrl: { type: String, default: '', required: true },
  description: { type: String, default: '', required: true },
  startDate: {type: Date, required: true},
  endDate: {type: Date},
  current: {type: Boolean, required: true, default: false },
}, {timestamps: true});

export default mongoose.model('Project', ProjectSchema);