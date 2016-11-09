import mongoose, { Schema } from 'mongoose';
import Project from '../models/project';
import moment from 'moment';

const handleError = (res, err) => {
  return res.status(404).json({ message: err });
}

/**
 * Me
 */
export function me(req, res) {

  Project.find({
    
    "profile_id": mongoose.Types.ObjectId(req.user.profile_id)

  }).exec((err, projects) => {
    
    if (err || !projects) return handleError(res, err);
    return res.status(200).json(projects);
  
  });

}

/**
 * Get
 */
export function get(req, res) {
  var uid = req.params.id

  Project.find({"profile_id": mongoose.Types.ObjectId(uid)}).exec((err, projects) => {
    if (err) {
      console.log('Error in "project/get" query');
      return res.status(401).send('Something went wrong getting the projects data');
    }
    return res.status(200).json(projects);
  });
}

/**
 * Create
 */

export function create(req, res) {
  
  Project.create({
    profile_id: req.user.profile_id,
    name: req.body.name,
    projectUrl: req.body.projectUrl,
    description: req.body.description,
    current: req.body.current,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
  }, function (err, project) {

    if (err) return handleError(res, err);
  
    return res.json(project);

  })
}

export function update(req, res) {
  
  return Project.findOne({"_id": req.body._id}).exec((err, project) => {

    project.name = req.body.name;
    project.projectUrl = req.body.projectUrl;
    project.current = req.body.current;
    
    if (req.body.description) {
      project.description = req.body.description;
    }
    
    if (req.body.startDate) {
      project.startDate = new Date(req.body.startDate);
    }
    
    if (req.body.endDate) {
      project.endDate = new Date(req.body.endDate);
    }

    project.save( err => {
      if (err) return handleError(res, err);
      return res.json(project);
    });

  })
}

export function remove (req, res) {
    Project.findByIdAndRemove(req.params.id, function (err, project){
      if(err) { return res.status(401).json({ message: err }); }
      return res.status(200).json({id: req.params.id, message: 'This project has been deleted.'})
    })
}


export default {
  me,
  get,
  create,
  update,
  remove
};
