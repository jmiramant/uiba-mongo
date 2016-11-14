import mongoose, { Schema } from 'mongoose';
import Profile from '../models/profile';
import Language from '../models/language';
import moment from 'moment';

const handleError = (res, err) => {
  return res.status(404).json({ message: err });
}

/**
 * Me
 */
export function me(req, res) {

  if (!req.user || !req.user.profile_id) {return res.status(403).json({ message: "There is no logged in user" })}
  
  Language.find({
    
    "profile_id": mongoose.Types.ObjectId(req.user.profile_id)

  }).exec((err, languages) => {
    
    if (err || !languages) return handleError(res, err);
    return res.status(200).json(languages);
  
  });

}

/**
 * Get
 */
export function get(req, res) {
  var uid = req.params.id

  Language.find({"user_id": mongoose.Types.ObjectId(uid)}).exec((err, languages) => {
    if (err) {
      console.log('Error in "language/get" query');
      return res.status(412).send('Something went wrong getting the languages data');
    }
    return res.status(200).json(languages);
  });
}

/**
 * Create
 */

export function create(req, res) {


  Language.find({'profile_id': req.user.profile_id}).exec( (err, existingLanguages) => {

    function containsType(language, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i].language === language) {
          return true;
        }
      }
      return false;
    }
    if (containsType(req.body.language, existingLanguages)) {
      
      return res.status(412).send('You have already added this language.');
    
    } else {
      Language.create({
        profile_id: req.user.profile_id,
        language: req.body.language,
        proficiency: req.body.proficiency,
        experience: req.body.experience,
      }, function (err, language) {

        if (err) return handleError(res, err);
      
        return res.json(language);

      })
    
    }
  });
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
  me,
  get,
  create,
  update,
  remove
};
