import mongoose, { Schema } from 'mongoose';
import { User } from './user';
import { Job } from './job';

const SkillSchema = new mongoose.Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  job_id: {type: Schema.Types.ObjectId, ref: 'Job'},
  type: { type: String, default: '', required: true },
  length: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
}, {timestamps: true});

export default mongoose.model('Skill', SkillSchema);
