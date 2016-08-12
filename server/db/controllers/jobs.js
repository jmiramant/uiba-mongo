import mongoose, { Schema } from 'mongoose';
import Job from '../models/job';

/**
 * List
 */
export function me(req, res) {
  Job.find({"user_id": mongoose.Types.ObjectId(req.user._id)}).exec((err, jobs) => {
    if (err) {
      console.log('Error in "jobs/me" query');
      return res.status(500).send('Something went wrong getting the data');
    }
    
    jobs.sort(function(a,b){
      return new Date(b.startDate) + new Date(a.endDate);
    });

    return res.status(200).json(jobs);
  });
}

/**
 * Get
 */
export function get(req, res) {
  Job.find({"user_id": mongoose.Types.ObjectId(req.user._id)}).exec((err, jobs) => {
    if (err) {
      console.log('Error in "jobs/me" query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(jobs);
  });
}

export default {
  me,
  get,
};
