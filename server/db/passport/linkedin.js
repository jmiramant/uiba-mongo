import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({ linkedin: profile.id }, (findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, { message: 'There is already a linkedin account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
        user.linkedin = profile.id;
        user.tokens.push({ kind: 'linkedin', accessToken });
        user.profile.name = user.profile.name || profile.displayName;
        user.profile.picture = user.profile.pictureUrl || profile._json.pictureUrl;
        user.profile.firstName = profile.name.givenName;
        user.profile.lastName = profile.name.familyName;
        user.profile.headline = profile._json.headline;
        user.profile.summary = profile._json.summary;
        user.profile.url = profile._json.publicProfileUrl;
        user.save((err) => {
          done(err, user, { message: 'linkedin account has been linked.' });
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
      user.email = profile._json.emailAddress;
      user.linkedin = profile.id;
      user.tokens.push({ kind: 'linkedin', accessToken });
      user.profile.name = profile.displayName;
      user.profile.picture = profile._json.pictureUrl;
      user.profile.firstName = profile.name.givenName;
      user.profile.lastName = profile.name.familyName;
      user.profile.headline = profile._json.headline;
      user.profile.summary = profile._json.summary;
      user.profile.url = profile._json.publicProfileUrl;
      return user.save((err) => {
        done(err, user);
      });
    });
  });
};
/* eslint-enable no-param-reassign */
