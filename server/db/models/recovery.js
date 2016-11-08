import mongoose, { Schema } from 'mongoose';

const RecoverySchema = new mongoose.Schema({
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile'},
  recruiter_key: {type: String},
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

export default mongoose.model('Recovery', RecoverySchema);