import mongoose, { Schema } from 'mongoose';
import Profile from '../models/profile';
import Interest from '../models/interest';
import moment from 'moment';

const handleError = (res, err) => {
  console.log(err);
  return res.status(404).json({ message: err });
}

/**
 * Me
 */
export function me(req, res) {
  
  if (!req.user || !req.user.profile_id) {return res.status(403).json({ message: "There is no currentUser" })}

  Interest.find({
    
    "profile_id": mongoose.Types.ObjectId(req.user.profile_id)

  }).exec((err, interests) => {
    
    if (err || !interests) return handleError(res, err);
    return res.status(200).json(interests);
  
  });

}

/**
 * Get
 */
export function get(req, res) {
  var uid = req.params.id

  Interest.find({"profile_id": mongoose.Types.ObjectId(uid)}).exec((err, interests) => {
    if (err) {
      console.log('Error in "interest/me" query');
      return res.status(412).send('Something went wrong getting the interests data');
    }
    return res.status(200).json(interests);
  });
}

/**
 * Create
 */

export function create(req, res) {


  Interest.find({'profile_id': req.user.profile_id}).exec( (err, existingInterests) => {

    function containsType(interest, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i].interest === interest) {
          return true;
        }
      }
      return false;
    }
    if (containsType(req.body.interest, existingInterests)) {
      
      return res.status(412).send('You have already added this interest.');
    
    } else {
      Interest.create({
        profile_id: req.user.profile_id,
        interest: req.body.interest,
      }, function (err, interest) {

        if (err) return handleError(res, err);
      
        return res.json(interest);

      })
    
    }
  });
}

export function update(req, res) {
  
  return Interest.findOne({"_id": req.body._id}).exec((err, interest) => {

    interest.interest = req.body.interest;

    interest.save( err => {
      if (err) return handleError(res, err);
      return res.json(interest);
    });

  })
}

export function remove (req, res) {
    Interest.findByIdAndRemove(req.params.id, function (err, interest){
      if(err) { return res.status(401).json({ message: err }); }
      return res.status(200).json({id: req.params.id, message: 'This interest has been deleted.'})
    })
}


export default {
  me,
  get,
  create,
  update,
  remove
};
