import async from 'async'
import User from '../models/user';
import Profile from '../models/profile'

const setDefaultProfileFields = (prof, profile, userId) => {
  prof.user_id = userId;
  prof.name = profile.displayName;
  prof.picture = profile._json.pictureUrl;
  prof.firstName = profile.name.givenName;
  prof.lastName = profile.name.familyName;
  prof.headline = profile._json.headline;
  prof.summary = profile._json.summary;
  prof.url = profile._json.publicProfileUrl;
}

const setDefaultUserFields = (user, profile, accessToken)  => {
  user.linkedin = profile.id;
  user.tokens.push({ kind: 'linkedin', accessToken });  
}

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({ linkedin: profile.id }, (findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, { message: 'There is already a linkedin account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      User.findById(req.user.id, (findByIdErr, user) => {

        setDefaultUserFields(user, profile, accessToken)

        Profile.find({"user_id": req.user.id}, (findByProfErr, _profile) => {

          setDefaultProfileFields(_profile, profile, user._id);
          
          return async.series({
            _profile: _profile.save,
            user: user.save
          }, function(err, res){
            done(err, res.user[0])
          });
        });
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
      
      return async.series({
        _profile: _profile.save,
        user: user.save
      }, function(err, res){
        done(err, res.user[0])
      });

    });
  });
};
/* eslint-enable no-param-reassign */
