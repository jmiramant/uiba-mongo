import mongoose, { Schema } from 'mongoose';
import { Company } from './company';
import { updateProfile } from './UpdateMiddleware';
import { Profile } from './profile';

const JobSchema = new mongoose.Schema({
  company_id: {type: Schema.Types.ObjectId, ref: 'Company'},
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile'},
  companyName: { type: String, required: true },
  title: {type: String, default: '', required: true},
  headline: {type: String, default: ''},
  description: {type: String, default: ''}, 
  startDate: {type: Date, required: true},
  endDate: {type: Date},
  current: {type: Boolean, required: true, default: false },
}, {timestamps: true});

JobSchema.post('save', (doc) => {
  updateProfile(doc)
});

JobSchema.pre('remove', (doc) => {
  updateProfile(doc)
});

export default mongoose.model('Job', JobSchema);
