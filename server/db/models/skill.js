import mongoose, { Schema } from 'mongoose';
import { Profile } from './profile';

const SkillSchema = new mongoose.Schema({
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  type: { type: String, default: '', required: true},
  proficiency: { type: Number,
                 enum: [1, 2, 3, 4],
                 required: true
               },
  lengthOfUse: { type: Number, required: true },
}, {timestamps: true});

export default mongoose.model('Skill', SkillSchema);
