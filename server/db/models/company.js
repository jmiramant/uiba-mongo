import mongoose, { Schema } from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: String,
  name_lower: { type: String, unique: true, lowercase: true },
  location: String,
  description: String, 
  foundedDate: Date,
  size: Number,
  logoImg: String
}, {timestamps: true});

function lowerCaseName(next) {
  const company = this;
  if (company.name) company.name_lower = company.name.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ').join('_');
  return next();
}

CompanySchema.pre('save', lowerCaseName);

export default mongoose.model('Company', CompanySchema);
