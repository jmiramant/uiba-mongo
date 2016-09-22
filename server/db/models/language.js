import mongoose, { Schema } from 'mongoose';
import { Profile } from './profile';

const LanguageSchema = new mongoose.Schema({
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  language: { type: String, default: '', required: true },
  proficiency: { type: Number,
                 enum: [1,2,3,4],
                 required: true
               },
  experience: { type: Number, enum: [0,1,3,5,10] }
}, {timestamps: true});

export default mongoose.model('Language', LanguageSchema);