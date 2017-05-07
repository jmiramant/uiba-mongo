import mongoose, { Schema } from 'mongoose';
import { User } from './user';
import { updateProfile } from './updateMiddleware';
import { Job } from './job';

const ProfileSchema = new mongoose.Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  company_id: {type: Schema.Types.ObjectId, ref: 'Company'},
  name: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  headline: { type: String, default: '' },
  apply: {
    applied: {type: Boolean, default: false },
    name: {type: String },
    applyComplete: {type: Boolean, default: false },
    company_id: {type: Schema.Types.ObjectId, ref: 'Company'},
    role_code: {type: String}
  },
  gender: { type: String, default: '' },
  claim: { type: Boolean, default: false },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  picture: { type: String, default: '' },
  service: { type: String, enum: ['linkedin', 'email', 'google', 'api'] },
  childUpdatedAt: { type: Date }
}, {timestamps: true});

// ProfileSchema.post('save', (err, doc, next) => {
//   doc.name = `${doc.firstName} ${doc.lastName}`;
//   doc.save((_err, doc) => {
//     next();
//   });
// });

ProfileSchema.post('save', (doc) => {
  updateProfile(doc);
});

ProfileSchema.pre('remove', (doc) => {
  updateProfile(doc);
});

ProfileSchema.statics = {};

export default mongoose.model('Profile', ProfileSchema);
