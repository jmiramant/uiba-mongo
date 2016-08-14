import mongoose, { Schema } from 'mongoose';
import { Company } from './company';
import { User } from './user';

const JobSchema = new mongoose.Schema({
  company_id: {type: Schema.Types.ObjectId, ref: 'Company'},
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  companyName: String,
  title: String,
  headline: String, 
  description: String, 
  startDate: Date,
  endDate: Date,
  current: Boolean,
}, {timestamps: true});

export default mongoose.model('Job', JobSchema);

