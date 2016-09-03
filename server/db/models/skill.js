import mongoose, { Schema } from 'mongoose';
import { Profile } from './profile';

const SkillSchema = new mongoose.Schema({
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  type: { type: String, default: '', required: true },
  proficiency: { type: String,
                 enum: ['learning', 'intermediate', 'competent', 'expert'],
                 required: true
               },
  lengthOfUse: { type: Number, required: true },
  frequency: { type: String,
               required: true,
               enum: ['yearly', 'monthly', 'weekly', 'daily']
             },
}, {timestamps: true});

export default mongoose.model('Skill', SkillSchema);
