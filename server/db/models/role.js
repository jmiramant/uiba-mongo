import mongoose, { Schema } from 'mongoose';
import { UpdateCompanyOnRole } from './updateMiddleware'

const degreeEnum = ['High School', 'Associate', 'Bachelor','Master','MBA','JD','MD','PhD','Engineer Degree','Certificate','Coursework','Other'];

const RoleSchema = new mongoose.Schema({
  company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true },
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile' },
  title: { type: String, default: '', required: true},
  description: { type: String, default: '', required: true },
  applicantCode: { type: String },
  filter: {
    school: [{ type: String, enum: degreeEnum }],
    skill: [{id: {type: Schema.Types.ObjectId, ref: 'Skill'},
            type: { type: String},
            proficiency: { type: Number},
            lengthOfUse: { type: Number }
    }],
    address: {}
  },
  appliedCount: { type: Number, default: 0},
  applicants: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  isArchived: {type: Boolean, default: false},
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