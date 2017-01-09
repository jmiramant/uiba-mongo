import mongoose, { Schema } from 'mongoose';
import { updateProfile } from './updateMiddleware';
import { Profile } from './profile';

const AddressSchema = new mongoose.Schema({
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile' },
  role_id: {type: Schema.Types.ObjectId, ref: 'Role' },
  company_id: {type: Schema.Types.ObjectId, ref: 'Role' },
  zip_code: String,
  lat: Number,
  lng: Number,
  city: String, 
  state: String,
  timezone: String,
  acceptable_city_names: Array
}, {timestamps: true});

AddressSchema.post('save', (doc) => {
  updateProfile(doc)
});

AddressSchema.pre('remove', (doc) => {
  updateProfile(doc)
});

export default mongoose.model('Address', AddressSchema);
