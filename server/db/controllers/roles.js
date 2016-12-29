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

const skillParsers = {

  toObject: (skills) => {
    const skillCreates = [];
    
    _.each(skills, (skill) => {
      const s = new Skill();
      s.type = skill.type;
      s.role_id = role._id
      s.proficiency = skill.proficiency;
      s.lengthOfUse = skill.lengthOfUse;
      skillCreates.push(s.save);
    });

    return skillCreates;
  },

  formatSkillCreateResp: (resp) => {
    return _.reduce(resp, (resp, s) => { 
      if (s[0]._id) resp.push({_id: s[0]._id, type: s[0].type, proficiency: s[0].proficiency, lengthOfUse: s[0].lengthOfUse});
      return resp;
    },[])
  }

}

export function create(req, res) {

  Roles.create({
    profile_id: mongoose.Types.ObjectId(req.user.profile_id),
    company_id: mongoose.Types.ObjectId(req.body.company_id),
    title: req.body.title,
    description: req.body.description,
    skills: req.body.skills,
  }, function(err, role) {
    if (err) return handleError(res, err);
    return res.json(role);
  })

}

export function update(req, res) {

  return Roles.findOne({
    "_id": req.body._id
  }).exec((fetchErr, _role) => {
    if (fetchErr) return handleError(res, err);

    if (req.body.company_id) _role.company_id = mongoose.Types.ObjectId(req.body.company_id);
    if (req.body.title) _role.title = req.body.title;
    if (req.body.description) _role.description = req.body.description;
    if (req.body.appliedCount) _role.appliedCount = req.body.appliedCount;
    if (req.body.isArchived) _role.isArchived = req.body.isArchived;
    if (req.body.skills) _role.skills = req.body.skills;

    _role.save((err, role) => {
      if (err) return handleError(res, err);
      return res.json(role);      
    });

  })
}

export function incrementApplicants(req, res) {
  return Roles.findOne({
    "applicantCode": req.body.role_id
  }).exec((fetchErr, _role) => {
    if (fetchErr || !_role) return handleError(res, fetchErr);

    if (_role.appliedCount) {
      _role.appliedCount = _role.appliedCount + 1;
    } else {
      _role.appliedCount = 1;
    }
    _role.save((err, role) => {
      if (err) return handleError(res, err);
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
  incrementApplicants,
};