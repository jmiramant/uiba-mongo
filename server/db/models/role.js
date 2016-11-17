import mongoose, { Schema } from 'mongoose';
import { UpdateCompanyOnRole } from './updateMiddleware'

const degreeEnum = ['High School', 'Associate', 'Bachelor','Master','MBA','JD','MD','PhD','Engineer Degree','Certificate','Coursework','Other'];

const RoleSchema = new mongoose.Schema({
  company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true },
  address_id: {type: Schema.Types.ObjectId, ref: 'Address' },
  title: { type: String, default: '', required: true},
  description: { type: String, default: '', required: true },
  applicantCode: { type: String },
  degreeRequirements: [{ type: String, enum: degreeEnum }],
  experienceMin: { type: Number },
  experienceMax: {type: Number },
  appliedCount: { type: Number, default: 0},
  applicants: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  skills: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
  isArchived: {type: Boolean, default: false}
}, {timestamps: true});

function setApplicantCode(next) {
  const role = this;
  if (!role.applicantCode) { 
    role.applicantCode = Math.random().toString(36).substring(7);
  }
  return next();
};

RoleSchema.pre('save', setApplicantCode);

RoleSchema.post('save', (next) => {
  UpdateCompanyOnRole(next)
});

RoleSchema.pre('remove', (next) => {
  UpdateCompanyOnRole(next)
});

RoleSchema.methods.addApplicant = (cb) => {
  this.appliedCount += 1;
  console.log(cb)
  return cb(null);
};

export default mongoose.model('Role', RoleSchema);