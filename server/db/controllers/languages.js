import mongoose, { Schema } from 'mongoose';
import Language from '../models/language';
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

  Language.find({"user_id": mongoose.Types.ObjectId(uid)}).exec((err, languages) => {
    if (err) {
      console.log('Error in "language/me" query');
      return res.status(500).send('Something went wrong getting the languages data');
    }
    return res.status(200).json(languages);
  });
}

/**
 * Create
 */

export function create(req, res) {
  
  Language.create({
    user_id: req.user._id,
    language: req.body.language,
    proficiency: req.body.proficiency,
    experience: req.body.experience,
  }, function (err, language) {

    if (err) return handleError(res, err);
  
    return res.json(language);

  })
}

export function update(req, res) {
  
  return Language.findOne({"_id": req.body._id}).exec((err, language) => {

    language.language = req.body.language;
    language.proficiency = req.body.proficiency;
    language.experience = req.body.experience;

    language.save( err => {
      if (err) return handleError(res, err);
      return res.json(language);
    });

  })
}

export function remove (req, res) {
    Language.findByIdAndRemove(req.params.id, function (err, language){
      if(err) { return res.status(401).json({ message: err }); }
      return res.status(200).json({id: req.params.id, message: 'This language has been deleted.'})
    })
}


export default {
  get,
  create,
  update,
  remove
};
