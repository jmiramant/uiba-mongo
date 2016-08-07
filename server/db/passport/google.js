import async from 'async'
import User from '../models/user';
import Profile from '../models/profile'

const setDefaultProfileFields = (prof, profile, userId) => {
  prof.user_id = userId;
  prof.name = profile.displayName;
  prof.gender = profile._json.gender;
  prof.picture = profile._json.picture;
}

const setDefaultUserFields = (user, profile, accessToken)  => {
  user.google = profile.id;
  user.tokens.push({ kind: 'google', accessToken });
}

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({ google: profile.id }, (findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, { message: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
  
        setDefaultUserFields(user, profile, accessToken)

        Profile.find({"user_id": req.user.id}, (findByProfErr, _profile) => {

          setDefaultProfileFields(_profile, profile, user._id); 

          return async.series({
            _profile: _profile.save,
            user: user.save
          }, function(err, res){
            done(err, res.user[0])
          });

        })
      });
    });
  }

  return User.findOne({ google: profile.id }, (findByGoogleIdErr, existingUser) => {
    if (existingUser) return done(null, existingUser);
    return User.findOne({ email: profile._json.emails[0].value }, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
      }
      const user = new User();
      const _profile = new Profile();

      user.email = profile._json.emails[0].value;
      
      setDefaultUserFields(user, profile, accessToken)
      setDefaultProfileFields(_profile, profile, user._id);

      async.series({
        _profile: _profile.save,
        user: user.save
      }, function(err, res){
        done(err, res.user[0])
      });

    });
  });
};
/* eslint-enable no-param-reassign */
