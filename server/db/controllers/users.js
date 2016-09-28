import User from '../models/user';
import Profile from '../models/profile';
import passport from 'passport';
import async from 'async'
import mailer from '../../utils/email.js'

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
    if (user.isEmailVerified) {
      // Passport exposes a login() function on req (also aliased as
      // logIn()) that can be used to establish a login session
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(401).json({ message: loginErr });
        return res.status(200).json({
          message: 'You have been successfully logged in.'
        });
      });
    } else {
      res.send(401, {message: 'This email is not yet verified. Please check your email to confirm the account.'});
    }
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
      name: req.body.first + ' ' + req.body.last,
      service: 'email',
      isEmailVerified: false
    })

    user.profile_id = _profile._id;

    return async.series({
      _profile: _profile.save,
      user: user.save
    }, function(saveErr, resp){
      if (saveErr) return next(saveErr);
      mailer.sendEmailConfirmation(user, req.headers.host)
      res.redirect(200, '/email-confirmation');

    });      

  });
}

export function emailConfirmation (req, res, next) {

  const token = req.params.token;

  if (!token) {
    return res.status(401).json({
      message: "Please pass a token"
    });
  }
  User.findOne({
    verifyEmailToken: token, 
    verifyEmailTokenExpires: {
      $gt: Date.now()
    }
  }, (err, user) => {
    if (!user) {
      return res.status(404).json({
        message: "Token is not valid or expired."
      })
    }
    user.isEmailVerified = true;
    user.verifyEmailToken = undefined;
    user.verifyEmailTokenExpires = undefined;
    user.save( (err) => {
      if (err) return next(err);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(401).json({ message: loginErr });
        res.redirect('/profile');
      });
    }) 

  });

}

export function resendEmailConfirmation (req, res, next) {
  const email = req.body.email;
  
  User.findOne({
    'email': email,
    'isEmailVerified': false
  }, function(err, user) {
    let errMsg;
    !user ? (errMsg = 'We could not find this email or it as already been verifed.') : (errMsg = err)
    if (err || !user) return res.status(401).json({ message: errMsg });
    
    mailer.sendEmailConfirmation(user, req.headers.host, (err, resp) => {
      err ? res.status(404).json(err) : res.status(200).json(resp)
    });
  });


}

export default {
  me,
  login,
  logout,
  signUp, 
  emailConfirmation,
  resendEmailConfirmation
};
