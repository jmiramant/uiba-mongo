import mongoose, { Schema } from 'mongoose';
import updateProfile from './profileUpdate'
import { Profile } from './profile';

const SchoolSchema = new mongoose.Schema({
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile'},
  name: { type: String, required: true },
  major: [{type: String, default: '', required: true}],
  minor: [{type: String, default: ''}],
  degree: {type: String, default: '', required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date},
  current: {type: Boolean, required: true, default: false },
}, {timestamps: true});

SchoolSchema.post('save', (doc) => {
  updateProfile(doc)
});

SchoolSchema.pre('remove', (doc) => {
  updateProfile(doc)
});

export default mongoose.model('School', SchoolSchema);