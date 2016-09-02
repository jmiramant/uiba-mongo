import mongoose, { Schema } from 'mongoose';
import Project from '../models/project';
import moment from 'moment';

const handleError = (res, err) => {
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

  Project.find({"user_id": mongoose.Types.ObjectId(uid)}).exec((err, projects) => {
    if (err) {
      console.log('Error in "project/me" query');
      return res.status(500).send('Something went wrong getting the projects data');
    }
    return res.status(200).json(projects);
  });
}

/**
 * Create
 */

export function create(req, res) {
  
  Project.create({
    user_id: req.user._id,
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
  get,
  create,
  update,
  remove
};
