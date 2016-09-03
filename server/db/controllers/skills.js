import mongoose, { Schema } from 'mongoose';
import Skill from '../models/skill';
import moment from 'moment';

const handleError = (res, err) => {
  return res.status(401).json({ message: err });
}

/**
 * Me
 */
export function me(req, res) {

  Skill.find({
    
    "profile_id": mongoose.Types.ObjectId(req.user.profile_id)

  }).exec((err, skills) => {
    
    if (err) return handleError(res, err);
    return res.status(200).json(skills);
  
  });

}

/**
 * Get
 */
export function get(req, res) {
  var uid = req.params.id

  Skill.find({"user_id": mongoose.Types.ObjectId(uid)}).exec((err, skills) => {
    if (err) {
      return res.status(500).send('Something went wrong getting the skills data');
    }
    return res.status(200).json(skills);
  });
}

/**
 * Create
 */

export function create(req, res) {
  
  Skill.create({
    profile_id: req.user.profile_id,
    type: req.body.type,
    proficiency: req.body.proficiency,
    lengthOfUse: req.body.lengthOfUse,
    frequency: req.body.frequency,
  }, function (err, skill) {

    if (err) return handleError(res, err);
  
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
      if (err) return handleError(res, err);
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
  me,
  get,
  create,
  update,
  remove
};
