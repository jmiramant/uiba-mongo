import async from 'async'
import _ from 'lodash'
import User from '../models/user';
import Profile from '../models/profile'
import Recruiter from '../models/recruiter';

const setDefaultProfileFields = (prof, profile, userId) => {
  prof.user_id = userId;
  prof.name = profile.displayName;
  prof.picture = profile._json.pictureUrl;
  prof.firstName = profile.name.givenName;
  prof.lastName = profile.name.familyName;
  prof.headline = profile._json.headline;
  prof.summary = profile._json.summary;
  prof.url = profile._json.publicProfileUrl;
  prof.email = profile._json.emailAddress;
  prof.service = 'linkedin'
}

const setDefaultUserFields = (user, profile, accessToken)  => {
  user.linkedin = profile.id;
  if (!user.tokens) {
    user.tokens = [];
  }
  user.tokens.push({ kind: 'linkedin', accessToken });  
}

const logRecruiter = (req, Profile) => {
  if (req.headers.referer.split('/apply/').length > 1) {
   
    const properString = (str) => {
      return str.split('-').map( (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
      }).join(' ');
    }

    const company = properString(req.headers.referer.split('/apply/')[1].split('?')[0]);
    
    if (req.headers.referer.split('/apply/')[1].split('?rid=')[1]) {
      
      const rid = req.headers.referer.split('/apply/')[1].split('?rid=')[1].split('&')[0];
      
      Recruiter.findOne({key: rid}).exec( (err, recruiter) => {
        const companyObj = _.find(recruiter.credit, (obj) => {
          return obj.company === company
        })
        
        if (companyObj) {
          companyObj.candidate.push(recruiter._id); 
        } else {
            company: company,
            candidate: [recruiter._id]
          })
          recruiter.credit.push({
            company: company,
            candidate: [recruiter._id]
          });
        }
        recruiter.save()
      });

    }
  }
}

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  
  if (req.user) { 
    return User.findOne({ linkedin: profile.id }, (findOneErr, existingUser) => {
      //standard
      if (existingUser) {
        return done(null, false, { message: 'There is already a linkedin account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      User.findOne({'_id': req.user.id}, (findByIdErr, _user) => {
        if (req.user.tokens.length === 0) {
          
          const secondUser = new User();
          Profile.findById(req.user.profile_id, (err, updatedProfile) => {
            
            setDefaultUserFields(secondUser, profile, accessToken)
            setDefaultUserFields(_user, profile, accessToken)
            setDefaultProfileFields(updatedProfile, profile, _user._id);

            updatedProfile.user_id = secondUser._id;
            _user.profile_id = updatedProfile._id;
            secondUser.profile_id = updatedProfile._id;
            
            return async.series({
              _profile: updatedProfile.save,
              secondUser: secondUser.save,
              user: _user.save,
            }, function(err, res){
              logRecruiter(req, updatedProfile);
              done(err, res.user[0])
            });

          })

        } else {
          
          setDefaultUserFields(user, profile, accessToken)

          Profile.find({"user_id": req.user.id}, (findByProfErr, _profile) => {

            setDefaultProfileFields(_profile, profile, user._id);
            
            user.profile_id = _profile._id;

            return async.series({
              _profile: _profile.save,
              user: user.save,
            }, function(err, res){
              logRecruiter(req, _profile);
              done(err, res.user[0])
            });

          });
        }
      });
    });
  }

  return User.findOne({ linkedin: profile.id }, (findBylinkedinIdErr, existingUser) => {
    if (existingUser) return done(null, existingUser);
    
    return User.findOne({ email: profile._json.emailAddress }, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with linkedin manually from Account Settings.' });
      }
      const user = new User();
      const _profile = new Profile();

      user.email = profile._json.emailAddress;

      setDefaultUserFields(user, profile, accessToken)
      setDefaultProfileFields(_profile, profile, user._id);
      user.profile_id = _profile._id;
      
      return async.series({
        _profile: _profile.save,
        user: user.save,
      }, function(err, res){
        logRecruiter(req, _profile);
        done(err, res.user[0])
      });

    });
  });
};
/* eslint-enable no-param-reassign */
