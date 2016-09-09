import User from '../models/user';
import Profile from '../models/profile';
import passport from 'passport';
import async from 'async'

/**
 * GET /user
 */
export function me(req, res) {
    if (!req.user) {
      console.log('Error in user /me query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(req.user);
}

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      return res.status(200).json({
        message: 'You have been successfully logged in.'
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(409).json({ message: 'Account with this email address already exists. Did you sign up with LinkedIn?' });
    }
    const _profile = new Profile({
      user_id: user.id,
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      name: req.body.first + ' ' + req.body.last
    })

    user.profile_id = _profile._id;

    return async.series({
      _profile: _profile.save,
      user: user.save
    }, function(saveErr, resp){
      if (saveErr) return next(saveErr);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(401).json({ message: loginErr });
        return res.status(200).json({
          message: 'You have been successfully logged in.'
        });
      });

    });      

  });
}

export default {
  me,
  login,
  logout,
  signUp
};
