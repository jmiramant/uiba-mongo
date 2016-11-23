import mongoose, {
  Schema
} from 'mongoose';
import Profile from '../models/profile';
import Roles from '../models/role';
import Company from '../models/company';
import Skill from '../models/skill';
import moment from 'moment';
import async from 'async'

const handleError = (res, err) => {
  return res.status(401).json({
    message: err.message
  });
}

/**
 * Me
 */
export function me(req, res) {

  if (!req.user || !req.user.company_id) {
    return res.status(403).json({
      message: "There is no current user or company_id"
    })
  }

  Roles.find({

    "company_id": mongoose.Types.ObjectId(req.user.company_id)

  }).exec((err, roles) => {

    if (err) return handleError(res, err);
    return res.status(200).json(roles);

  });

}


export function get(req, res) {
  
  const respCb = (err, role) => {
    if (err) return res.status(500).send('Something went wrong getting the data');
    if (!role) return res.status(401).send('There is not role from this ID');

    return res.status(200).json(role);
  }

  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    
    Roles.findById(req.params.id, respCb)
  
  } else {

    Roles.findOne({'applicantCode': req.params.id}, respCb)
  
  }
}

export function list(req, res) {
  var uid = req.params.id

  Roles.find({
    "company_id": mongoose.Types.ObjectId(uid),
  }).exec((err, roles) => {
    if (err) {
      console.log('Error in "roles/list" query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.status(200).json(roles);
  });
}

export function create(req, res) {

  Roles.create({
    profile_id: mongoose.Types.ObjectId(req.user.profile_id),
    company_id: mongoose.Types.ObjectId(req.body.company_id),
    title: req.body.title,
    description: req.body.description,
    degreeRequirements: req.body.degreeRequirements,
    experienceMin: req.body.experienceMin,
    experienceMax: req.body.experienceMax,
  }, function(err, role) {
    if (err) return handleError(res, err);

    if (req.body.skills && req.body.skills.length > 0) {

      const skillCreates = [];
      
      _.each(req.body.skills, (skill) => {
        const s = new Skill();
        s.type = skill.type;
        s.role_id = role._id
        s.proficiency = skill.proficiency;
        s.lengthOfUse = skill.lengthOfUse;
        skillCreates.push(s.save);
      })

      async.parallel(skillCreates, (err, resp) => {
        if (err) return res.status(404).send('Something went wrong saving skills.')

        role.skills = resp.map((s) => {
          return s[0]._id
        });

        role.save((err, _role) => {
          if (err) return handleError(res, err);
          return res.json(_role);
        })

      });

    } else {

      return res.json(role);

    }

  })

}

export function update(req, res) {

  return Roles.findOne({
    "_id": req.body._id
  }).exec((err, role) => {

    role.company_id = mongoose.Types.ObjectId(req.body.company_id);
    role.title = req.body.title;
    role.description = req.body.description;
    role.appliedCount = req.body.appliedCount;
    role.isArchived = req.body.isArchived;

    role.save(err => {
      if (err) return handleError(err);
      return res.json(role);
    });

  })
}

export function remove(req, res) {
  Roles.findByIdAndRemove(req.params.id, function(err, offer) {
    if (err) {
      throw err;
    }
    return res.status(200).json({
      id: req.params.id,
      message: 'This role has been deleted.'
    })
  })
}

export default {
  me,
  get,
  list,
  create,
  update,
  remove,
};