import mongoose, { Schema } from 'mongoose';

const AddressSchema = new mongoose.Schema({
  zip_code: String,
  lat: Number,
  lng: Number,
  city: String, 
  state: String,
  timezone: String,
  acceptable_city_names: Array
}, {timestamps: true});

export default mongoose.model('Address', AddressSchema);
