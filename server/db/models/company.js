import mongoose, { Schema } from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: { type: String },
  name_lower: { type: String, unique: true, lowercase: true },
  address_id: {type: Schema.Types.ObjectId, ref: 'Address'},
  description: { type: String }, 
  foundedDate: { type: Date },
  size: { type: Number },
  websiteUrl: { type: String },
  logoUrl: { type: String },
  specialties: { type: Array, default: []},
  industry: { type: String },
  roleUpdatedAt: { type: Date }
}, {timestamps: true});

function lowerCaseName(next) {
  const user = this;
  if (user.name) user.name_lower = name.toLowerCase();
  return next();
}

CompanySchema.pre('save', lowerCaseName);

export default mongoose.model('Company', CompanySchema);
