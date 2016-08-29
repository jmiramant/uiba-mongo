import mongoose, { Schema } from 'mongoose';
import { User } from './user';

const LanguageSchema = new mongoose.Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true },
  language: { type: String, default: '', required: true },
  proficiency: { type: String,
                 enum: ['elementary proficiency', 'limited working proficiency', 'minimum professional proficiency', 'full professional proficiency', 'native or bilingual proficiency'],
                 required: true
               },
  experience: { type: Number, required: true }
}, {timestamps: true});

export default mongoose.model('Language', LanguageSchema);