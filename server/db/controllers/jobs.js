import mongoose, { Schema } from 'mongoose';
import Job from '../models/job';
import Company from '../models/company';

const handleError = (err) => {
  console.log(err)
}

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

/**
 * Create
 */

export function create(req, res) {
  
  function createDateObj (date) {
    const split = date.split('-');
    return new Date(split[0], split[1], split[2])
  };

  return Company.create({
    name: req.body.company
  }, function (err, company) {

    if (err) return handleError(err);

    Job.create({
      user_id: req.user._id,
      company_id: company._id,
      companyName: req.body.company,
      description: req.body.description,
      title: req.body.title,
      startDate: createDateObj(req.body.startDate),
      endDate: createDateObj(req.body.endDate),
    }, function (err, job) {

      if (err) return handleError(err);
    
      return res.json(job);

    })
  })

}

export default {
  me,
  get,
  create
};
