import mongoose, { Schema } from 'mongoose';
import Filter from '../models/filter';
import moment from 'moment';

const handleError = (res, err) => {
  return res.status(404).json({ message: err }); 
}

export function get(req, res) {
  const roleId = req.params.id;

  if (!req.user.profile_id || !roleId) handleError(res, 'Missing profile_id or role_id for filters/get')

  const query = {
    profile_id: mongoose.Types.ObjectId(req.user.profile_id),
    role_id: mongoose.Types.ObjectId(roleId)
  };

  Filter.find(query).exec((err, filters) => {
    if (err) {
      console.log('Error in "filters/me" query');
      return res.status(404).send(err.message);
    }
    return res.status(200).json(filters);
  });
}

export function create(req, res) {
  Filter.create({
    profile_id: req.user.profile_id,
    role_id: req.body.roleId,
    name:  req.body.name,
    skill: req.body.skill,
    school: req.body.school,
    address: req.body.address,
    score: req.body.score,
  }, function (err, filter) {

    if (err) return handleError(res, err);
  
    return res.json(filter);

  })
}

export function remove (req, res) {
  Filter.findByIdAndRemove(req.params.id, function (err, filter){
    if(err) { return res.status(401).json({ message: err }); }
    return res.status(200).json({id: req.params.id, message: 'This filter has been deleted.'})
  })
}


export default {
  get,
  create,
  remove
};
