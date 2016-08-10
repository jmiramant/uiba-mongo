import mongoose, { Schema } from 'mongoose';
import { Company } from './company';

const JobSchema = new mongoose.Schema({
  company_id: {type: Schema.Types.ObjectId, ref: 'Company'},
  companyName: String,
  title: String,
  headline: String, 
  description: String, 
  startDate: Date,
  endDate: Date,
  active: Boolean,
  creationDate: { type: Date, default: Date.now }
});

export default mongoose.model('Job', JobSchema);

