import mongoose, { Schema } from 'mongoose';
import { Profile } from './profile';

export function updateProfile(doc) {
  mongoose.model("Profile").findById(doc.profile_id, (err, prof) => {
    if (prof) {
      prof.childUpdatedAt = new Date();
      prof.save();
    }
  });
}

export function UpdateCompanyOnRole(doc) {
  mongoose.model("Company").findById(doc.company_id, (err, prof) => {
    if (prof) {
      prof.roleUpdatedAt = new Date();
      prof.save();
    }
  });
}

export default {
  UpdateCompanyOnRole,
  updateProfile
}