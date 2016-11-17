import mongoose, { Schema } from 'mongoose';
import { User } from './user';
import { updateProfile } from './updateMiddleware';
import { Job } from './job';

const ProfileSchema = new mongoose.Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  company_id: {type: Schema.Types.ObjectId, ref: 'Company'},
  name: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, default: '' },
  headline: { type: String, default: '' },
  apply: { 
    applied: {type: Boolean, default: false }, 
    name: {type: String }, 
    applyComplete: {type: Boolean, default: false },
    company_id: {type: Schema.Types.ObjectId, ref: 'Company'}
  },
  gender: { type: String, default: '' },
  claim: { type: Boolean, default: false },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  picture: { type: String, default: '' },
  service: { type: String, enum: ['linkedin', 'email', 'google'] }, 
  childUpdatedAt: { type: Date }
}, {timestamps: true});

ProfileSchema.post('save', (doc) => {
  updateProfile(doc)
});

ProfileSchema.pre('remove', (doc) => {
  updateProfile(doc)
});

ProfileSchema.statics = {};

export default mongoose.model('Profile', ProfileSchema);
