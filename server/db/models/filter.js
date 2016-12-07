import mongoose, { Schema } from 'mongoose';

const FilterSchema = new mongoose.Schema({
  role_id: {type: Schema.Types.ObjectId, ref: 'Role', required: true},
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  name: {type: String, required: true},
  skill: { type: Array, default: []},
  school: { type: Array, default: []},
  address: { type: Object, default: ''},
  score: { type: Object, default: { min: undefined, max: undefined} }
}, {timestamps: true});

export default mongoose.model('Filter', FilterSchema);
