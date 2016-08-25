import mongoose, { Schema } from 'mongoose';
import Skill from '../models/skill';
import moment from 'moment';

const handleError = (err) => {
  console.log(err);
  return res.status(401).json({ message: err });
}

const setUid = (req) => {

  if (req.params && req.params.id) {
    return req.params.id 
  } else if (req.user && req.user._id) {
    return req.user._id;
  } else {
    return req.session.passport.user;
  }

}

/**
 * Get
 */
export function get(req, res) {
  var uid = setUid(req);

  Skill.find({"user_id": mongoose.Types.ObjectId(uid)}).exec((err, skills) => {
    if (err) {
      console.log('Error in "skill/me" query');
      return res.status(500).send('Something went wrong getting the skills data');
    }
    return res.status(200).json(skills);
  });
}

/**
 * Create
 */

export function create(req, res) {
  
  School.create({
    user_id: req.user._id,
    type: req.body.name,
    proficiency: req.body.proficiency,
    lengthOfUse: req.body.lengthOfUse,
    frequency: req.body.frequency,
  }, function (err, skill) {

    if (err) return handleError(err);
  
    return res.json(skill);

  })
}

export function update(req, res) {
  
  return Skill.findOne({"_id": req.body._id}).exec((err, skill) => {
    
    skill.type = req.body.type;
    skill.proficiency = req.body.proficiency;
    skill.lengthOfUse = req.body.lengthOfUse;
    skill.frequency = req.body.frequency;

    skill.save( err => {
      if (err) return handleError(err);
      return res.json(skill);
    });

  })
}

export function remove (req, res) {
    Skill.findByIdAndRemove(req.params.id, function (err, skill){
      if(err) { return res.status(401).json({ message: err }); }
      return res.status(200).json({id: req.params.id, message: 'This skill has been deleted.'})
    })
}


export default {
  get,
  create,
  update,
  remove
};
