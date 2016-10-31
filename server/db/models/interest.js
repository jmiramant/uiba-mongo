import mongoose, { Schema } from 'mongoose';
import { updateProfile } from './updateMiddleware';
import { Profile } from './profile';

const InterestSchema = new mongoose.Schema({
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  interest: { type: String, default: '', required: true },
}, {timestamps: true});

InterestSchema.post('save', (doc) => {
  updateProfile(doc)
});

InterestSchema.pre('remove', (doc) => {
  updateProfile(doc)
});

export default mongoose.model('Interest', InterestSchema);