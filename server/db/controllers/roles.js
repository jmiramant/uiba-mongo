import mongoose, { Schema } from 'mongoose';
import Profile from '../models/profile';
import Roles from '../models/role';
import Company from '../models/company';
import moment from 'moment';

const handleError = (res, err) => {
  return res.status(401).json({ message: err.message });
}

/**
 * Me
 */
export function me(req, res) {

  Roles.find({
    
    "company_id": mongoose.Types.ObjectId(req.user.company_id)

  }).exec((err, roles) => {
    
    if (err) return handleError(res, err);
    return res.status(200).json(roles);
  
  });

}

/**
 * Get
 */
export function get(req, res) {
  var uid = req.params.id

  Roles.find({"company_id": mongoose.Types.ObjectId(uid)}).exec((err, roles) => {
    if (err) {
      console.log('Error in "roles/me" query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.status(200).json(roles);
  });
}

/**
 * Create
 */

export function create(req, res) {
  console.log(req.body)
  Roles.create({
    profile_id: mongoose.Types.ObjectId(req.user.profile_id),
    company_id: mongoose.Types.ObjectId(req.body.company_id),
    title: req.body.title,
    description: req.body.description,
    degreeMin: req.body.degreeMin,
    degreeMax: req.body.degreeMax,
    experienceMin: req.body.experienceMin,
    experienceMax: req.body.experienceMax
  }, function (err, role) {
    console.log(err)
    if (err) return handleError(res, err);

    return res.json(role);

  })
  
}

export function update(req, res) {
  
  return Roles.findOne({"_id": req.body._id}).exec((err, role) => {
    
    role.description = req.body.description;
    role.title = req.body.title;
    
    if (req.body.startDate) {
      role.startDate = new Date(req.body.startDate);
    }
    
    if (req.body.endDate) {
      role.endDate = new Date(req.body.endDate);
    }

    if (role.companyName !== req.body.companyName) {

      const company_id = mongoose.Types.ObjectId(req.body._id);
      
      return Company.findOne({"name": company_id}).exec((err, company) => { 
      
        if (err) {
          
          role.current = company.current;
          role.companyName = company.name;
          role.company_id = company.company_id;
          role.save( err => {
            if (err) return handleError(err);
            return res.json(role);
          });
      
        } else {
      
          return Company.create({
            name: req.body.companyName
          }, function (err, company) {
            role.companyName = req.body.companyName;
            role.company_id = req.body.company_id;
            role.save( err => {
              if (err) return handleError(err);
              return res.json(role);
            });
          })
      
        }
      })
    } else {
     
     role.save( err => {
        if (err) return handleError(err);
        return res.json(role);
      });

    }
  })
}

export function remove (req, res) {
    Roles.findByIdAndRemove(req.params.id, function (err,offer){
      if(err) { throw err; }
      return res.status(200).json({id: req.params.id, message: 'This role has been deleted.'})// ...
    })
}


export default {
  me,
  get,
  create,
  update,
  remove
};
