import mongoose, { Schema } from 'mongoose';
import { Profile } from './profile';
import { updateProfile } from './updateMiddleware';
import { User } from './user';

const SkillSchema = new mongoose.Schema({
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile'},
  type: { type: String, default: '', required: true},
  proficiency: { type: Number,
                 enum: [1, 2, 3, 4],
                 required: true
               },
  lengthOfUse: { type: Number, required: true },
}, {timestamps: true});

/**
 * Update Profile Timestamp hash middleware.
 */
SkillSchema.post('save', (doc) => {
  updateProfile(doc)
});

SkillSchema.pre('remove', (doc) => {
  updateProfile(doc)
});

export default mongoose.model('Skill', SkillSchema);
