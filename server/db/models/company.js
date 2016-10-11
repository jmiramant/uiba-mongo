import mongoose, { Schema } from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: String,
  name_lower: String,
  location: String,
  description: String, 
  foundedDate: Date,
  size: Number,
  logoImg: String
}, {timestamps: true});

function lowerCaseName(next) {
  const user = this;
  if (user.name) user.name_lower = name.toLowerCase();
  return next();
}

CompanySchema.pre('save', lowerCaseName);

export default mongoose.model('Company', CompanySchema);
