import mongoose, { Schema } from 'mongoose';
import { User } from './user';

const SchoolSchema = new mongoose.Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  name: { type: String, required: true },
  major: [{type: String, default: '', required: true}],
  minor: [{type: String, default: '', required: true}],
  degree: [{type: String, default: '', required: true}],
  startDate: {type: Date, required: true},
  endDate: {type: Date},
  current: {type: Boolean, required: true, default: false },
}, {timestamps: true});

export default mongoose.model('School', SchoolSchema);