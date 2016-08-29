import mongoose, { Schema } from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String, 
  foundedDate: Date,
  size: Number,
  logoImg: String
}, {timestamps: true});

export default mongoose.model('Company', CompanySchema);

