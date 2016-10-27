import mongoose, { Schema } from 'mongoose';
import { UpdateCompanyOnRole } from './updateMiddleware'
import { Company } from './company';

const degreeEnum = ['High School', 'Associate', 'Bachelor','Master','MBA','JD','MD','PhD','Engineer Degree','Certificate','Coursework','other'];

const RoleSchema = new mongoose.Schema({
  company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true },
  address_id: {type: Schema.Types.ObjectId, ref: 'Address' },
  title: { type: String, default: '', required: true},
  description: { type: String, default: '', required: true },
  applicantCode: { type: String, unique: true},
  degreeMin: { type: String, enum: degreeEnum },
  degreeMax: { type: String, enum: degreeEnum },
  experienceMin: { type: Number },
  experienceMin: {type: Number },
  appliedCount: { type: Number, default: 0},
}, {timestamps: true});

RoleSchema.post('save', (doc) => {
  UpdateCompanyOnRole(doc)
});

RoleSchema.pre('remove', (doc) => {
  UpdateCompanyOnRole(doc)
});

UserSchema.methods = {
  incrementAppliedCount(cb) {
    this.appliedCount += 1;
    return cb(null);
  },
};

export default mongoose.model('Role', RoleSchema);