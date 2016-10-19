import mongoose, { Schema } from 'mongoose';
import { Profile } from './profile';

const AddressSchema = new mongoose.Schema({
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  zip_code: String,
  lat: Number,
  lng: Number,
  city: String, 
  state: String,
  timezone: String,
  acceptable_city_names: Array
}, {timestamps: true});

export default mongoose.model('Address', AddressSchema);
