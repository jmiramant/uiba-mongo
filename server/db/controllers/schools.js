import mongoose, { Schema } from 'mongoose';
import School from '../models/school';
import moment from 'moment';

const handleError = (res, err) => {
  return res.status(404).json({ message: err }); 
}

/**
 * Me
 */
export function me(req, res) {
  if (!req.user || !req.user.profile_id) {return res.status(403).json({ message: "There is no logged in user" })}
  School.find({
    
    "profile_id": mongoose.Types.ObjectId(req.user.profile_id)

  }).exec((err, schools) => {
    
    if (err || !schools) return handleError(res, err);
    return res.status(200).json(schools);
  
  });

}

/**
 * Get
 */
export function get(req, res) {
  var uid = req.params.id

  School.find({"profile_id": mongoose.Types.ObjectId(uid)}).exec((err, schools) => {
    if (err) {
      console.log('Error in "schools/me" query');
      return res.status(404).send('Something went wrong getting the schools data');
    }
    return res.status(200).json(schools);
  });
}

/**
 * Create
 */

export function create(req, res) {
  
  let end = undefined;
  if (req.body.endDate) end = new Date(req.body.endDate);
  
  School.create({
    profile_id: req.user.profile_id,
    name: req.body.name,
    major: [req.body.major],
    minor: [req.body.minor],
    degree: req.body.degree,
    startDate: new Date(req.body.startDate),
    endDate: end,
    current: req.body.current
  }, function (err, school) {

    if (err) return handleError(res, err);
  
    return res.json(school);

  })
}

export function update(req, res) {
  
  return School.findOne({"_id": req.body._id}).exec((err, school) => {
    
    school.name = req.body.name;
    school.current = req.body.current;

    if (req.body.major) school.major = req.body.major;
    if (req.body.minor) school.minor = req.body.minor;
    if (req.body.degree) school.degree = req.body.degree;
    if (req.body.startDate) school.startDate = new Date(req.body.startDate);
    if (req.body.endDate) school.endDate = new Date(req.body.endDate);

    school.save( err => {
      if (err) return handleError(res, err);
      return res.json(school);
    });

  })
}

export function remove (req, res) {
    School.findByIdAndRemove(req.params.id, function (err,offer){
      if(err) { return res.status(401).json({ message: err }); }
      return res.status(200).json({id: req.params.id, message: 'This institution has been deleted.'})
    })
}


export default {
  me,
  get,
  create,
  update,
  remove
};
