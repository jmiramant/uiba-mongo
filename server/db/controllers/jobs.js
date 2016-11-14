import mongoose, { Schema } from 'mongoose';
import Profile from '../models/profile';
import Job from '../models/job';
import Company from '../models/company';
import moment from 'moment';

const handleError = (res, err) => {
  return res.status(404).json({ message: err });
}

/**
 * Me
 */
export function me(req, res) {
  
  if (!req.user || !req.user.profile_id) {return res.status(403).json({ message: "There is no logged in user" })}
  
  Job.find({
    
    "profile_id": mongoose.Types.ObjectId(req.user.profile_id)

  }).exec((err, jobs) => {
    if (err || !jobs) return handleError(res, err);
    return res.status(200).json(jobs);
  
  });

}

/**
 * Get
 */
export function get(req, res) {
  var uid = req.params.id

  Job.find({"profile_id": mongoose.Types.ObjectId(uid)}).exec((err, jobs) => {
    if (err) {
      console.log('Error in "jobs/me" query');
      return res.status(401).send('Something went wrong getting the data');
    }
    return res.status(200).json(jobs);
  });
}

/**
 * Create
 */

export function create(req, res) {
  
  return Company.create({
    name: req.body.company
  }, function (err, company) {

    if (err) return handleError(err);

    Job.create({
      profile_id: req.user.profile_id,
      company_id: company._id,
      companyName: req.body.companyName,
      description: req.body.description,
      title: req.body.title,
      current: req.body.current,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    }, function (err, job) {

      if (err) return handleError(err);
    
      return res.json(job);

    })
  })

}

export function update(req, res) {
  
  return Job.findOne({"_id": req.body._id}).exec((err, job) => {
    
    job.description = req.body.description;
    job.title = req.body.title;
    
    if (req.body.startDate) {
      job.startDate = new Date(req.body.startDate);
    }
    
    if (req.body.endDate) {
      job.endDate = new Date(req.body.endDate);
    }

    if (job.companyName !== req.body.companyName) {

      const company_id = mongoose.Types.ObjectId(req.body._id);
      
      return Company.findOne({"name": company_id}).exec((err, company) => { 
      
        if (err) {
          
          job.current = company.current;
          job.companyName = company.name;
          job.company_id = company.company_id;
          job.save( err => {
            if (err) return handleError(err);
            return res.json(job);
          });
      
        } else {
      
          return Company.create({
            name: req.body.companyName
          }, function (err, company) {
            job.companyName = req.body.companyName;
            job.company_id = req.body.company_id;
            job.save( err => {
              if (err) return handleError(err);
              return res.json(job);
            });
          })
      
        }
      })
    } else {
     
     job.save( err => {
        if (err) return handleError(err);
        return res.json(job);
      });

    }
  })
}

export function remove (req, res) {
    Job.findByIdAndRemove(req.params.id, function (err,offer){
      if(err) { throw err; }
      return res.status(200).json({id: req.params.id, message: 'This job has been deleted.'})// ...
    })
}


export default {
  me,
  get,
  create,
  update,
  remove
};
