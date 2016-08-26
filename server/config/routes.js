/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const profilesController = controllers && controllers.profiles;
const jobsController = controllers && controllers.jobs;
const schoolsController = controllers && controllers.schools;
const schoolNamesController = controllers && controllers.schoolNames;
const skillsController = controllers && controllers.skills;

export default (app) => {

  if (usersController) {
    app.get('/me', usersController.me);
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (jobsController) {
    app.get('/jobs', jobsController.get);
    app.post('/jobs', jobsController.create);
    app.put('/jobs', jobsController.update);
    app.delete('/jobs/:id', jobsController.remove);
  } else {
    console.warn(unsupportedMessage('job routes'));
  }

  if (schoolNamesController) {
    app.get('/schools', schoolsController.get);
    app.post('/schools', schoolsController.create);
    app.put('/schools', schoolsController.update);
    app.delete('/school/:id', schoolsController.remove);
  } else {
    console.warn(unsupportedMessage('schools routes'));
  }

  if (skillsController) {
    app.get('/skills', skillsController.get);
    app.post('/skills', skillsController.create);
    app.put('/skills', skillsController.update);
    app.delete('/skill/:id', skillsController.remove);
  } else {
    console.warn(unsupportedMessage('skills routes'));
  }

  if (schoolNamesController) {
    app.get('/schoolNames/search', schoolNamesController.search);
  } else {
    console.warn(unsupportedMessage('schoolNames routes'));
  }


  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/login'
      })
    );
  }

  if (passportConfig && passportConfig.linkedin) {

    app.get('/auth/linkedin',
      passport.authenticate('linkedin', { state: 'SOME STATE'  }),
      function(req, res){
         // The request will be redirected to LinkedIn for authentication, so this
         // function will not be called.
      });

    app.get('/auth/linkedin/callback', 
      passport.authenticate('linkedin', {
        successRedirect: '/profile',
        failureRedirect: '/login'
      })
    );

  }
  
  app.get('/profile/me', profilesController.me);

};
