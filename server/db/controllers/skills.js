import mongoose, { Schema } from 'mongoose';
import Skill from '../models/skill';
import moment from 'moment';

const handleError = (res, err) => {
  return res.status(404).send(err);
}

/**
 * Me
 */
export function me(req, res) {

  if (!req.user || !req.user.profile_id) {return res.status(403).json({ message: "There is no logged in user" })}

  Skill.find({
    
    "profile_id": mongoose.Types.ObjectId(req.user.profile_id)

  }).exec((err, skills) => {
    if (err || !skills) return handleError(res, err);
    return res.status(200).json(skills);
  
  });

}

/**
 * Get
 */
export function get(req, res) {
  var uid = JSON.parse(req.params.id)
  let request;
  if (uid.indexOf(']')) {
    request = {"_id": {
      '$in': uid
    }}
  } else {
    request = {"profile_id": mongoose.Types.ObjectId(uid)}
  }
  Skill.find(request).exec((err, skills) => {
    if (err) {
      return res.status(404).send('Something went wrong getting the skills data');
    }
    console.log(skills)
    return res.status(200).json(skills);
  });
}

/**
 * Create
 */

export function create(req, res) {

  Skill.find({'profile_id': req.user.profile_id}).exec( (err, existingSkills) => {

    function containsType(type, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i].type === type) {
          return true;
        }
      }
      return false;
    }

    if (containsType(req.body.type, existingSkills)) {
      return res.status(403).send('You have already added this skill.');
    
    } else {


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
  });
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
