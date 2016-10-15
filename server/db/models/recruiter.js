import mongoose, { Schema } from 'mongoose';

const RecruiterSchema = new mongoose.Schema({
  company_id: {type: Schema.Types.ObjectId, ref: 'Company'},
  profile_id: {type: Schema.Types.ObjectId, ref: 'Profile'},
  key: {type: String },
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  credit: [{
            company: String,
            candidate: [{type: Schema.Types.ObjectId, ref: 'Profile'}]
          }]
}, {timestamps: true});

export default mongoose.model('Recruiter', RecruiterSchema);
