/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
import jwtauth from './jwtauth';

const usersController = controllers && controllers.users;
const profilesController = controllers && controllers.profiles;
const jobsController = controllers && controllers.jobs;
const schoolsController = controllers && controllers.schools;
const schoolNamesController = controllers && controllers.schoolNames;
const skillsController = controllers && controllers.skills;
const projectsController = controllers && controllers.projects;
const languagesController = controllers && controllers.languages;
const recruitersController = controllers && controllers.recruiters;

const exportsController = controllers && controllers._exports;
const tokensController = controllers && controllers.tokens;


export default (app) => {

  if (profilesController) {
    app.get('/profile/me', profilesController.me);
    app.put('/profile', profilesController.update);
  } else {
    console.warn(unsupportedMessage('profile routes'));
  }

  if (usersController) {
    app.get('/me', usersController.me);
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
    app.get('/validateEmail/:token', usersController.emailConfirmation);
    app.post('/resendValidationEmail', usersController.resendEmailConfirmation)
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (jobsController) {
    app.get('/jobs/me', jobsController.me);
    app.get('/jobs/:id', jobsController.get);
    app.post('/jobs', jobsController.create);
    app.put('/jobs', jobsController.update);
    app.delete('/jobs/:id', jobsController.remove);
  } else {
    console.warn(unsupportedMessage('job routes'));
  }

  if (schoolNamesController) {
    app.get('/schools/me', schoolsController.me);
    app.get('/schools/:id', schoolsController.get);
    app.post('/schools', schoolsController.create);
    app.put('/schools', schoolsController.update);
    app.delete('/school/:id', schoolsController.remove);
  } else {
    console.warn(unsupportedMessage('schools routes'));
  }

  if (skillsController) {
    app.get('/skills/me', skillsController.me);
    app.get('/skills/:id', skillsController.get);
    app.post('/skills', skillsController.create);
    app.put('/skills', skillsController.update);
    app.delete('/skill/:id', skillsController.remove);
  } else {
    console.warn(unsupportedMessage('skills routes'));
  }

  if (languagesController) {
    app.get('/languages/me', languagesController.me);
    app.get('/languages/:id', languagesController.get);
    app.post('/languages', languagesController.create);
    app.put('/languages', languagesController.update);
    app.delete('/language/:id', languagesController.remove);
  } else {
    console.warn(unsupportedMessage('languages routes'));
  }

  if (projectsController) {
    app.get('/projects/me', projectsController.me);
    app.get('/projects/:id', projectsController.get);
    app.post('/projects', projectsController.create);
    app.put('/projects', projectsController.update);
    app.delete('/project/:id', projectsController.remove);
  } else {
    console.warn(unsupportedMessage('projects routes'));
  }

  if (recruitersController) {
    app.post('/recruiter/create', recruitersController.create);
  } else {
    console.warn(unsupportedMessage('recruiter routes'));
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
      passport.authenticate('linkedin'),
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

    app.get('/auth/linkedin/:companyName/:rid',
      passport.authenticate('linkedin'),
      function(req, res){
         // The request will be redirected to LinkedIn for authentication, so this
         // function will not be called.
      });

    app.get('/auth/linkedin/:companyName',
      passport.authenticate('linkedin'),
      function(req, res){
         // The request will be redirected to LinkedIn for authentication, so this
         // function will not be called.
      });

  }

  if (tokensController) {
    app.get('/api/v1/token', tokensController.token);
  } else {
    console.warn(unsupportedMessage('export API routes'));
  }

  if (exportsController) {
    app.get('/api/v1/export/updated/:datetime', jwtauth, exportsController.updated);
    app.get('/api/v1/export/created/:datetime', jwtauth, exportsController.created);
  } else {
    console.warn(unsupportedMessage('export API routes'));
  }


};
