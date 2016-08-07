/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const profilesController = controllers && controllers.profiles;
//const topicsController = controllers && controllers.topics;

export default (app) => {

  if (usersController) {
    app.get('/me', usersController.me);
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
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
        successRedirect: '/',
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
        successRedirect: '/',
        failureRedirect: '/profile'
      })
    );

  }
  
  app.get('/profile/me', profilesController.me);

  // topic routes
  // if (topicsController) {
  //   app.get('/topic', topicsController.all);
  //   app.post('/topic/:id', topicsController.add);
  //   app.put('/topic/:id', topicsController.update);
  //   app.delete('/topic/:id', topicsController.remove);
  // } else {
  //   console.warn(unsupportedMessage('topics routes'));
  // }
};
