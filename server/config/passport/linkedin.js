import LinkedInStrategy from 'passport-linkedin-oauth2';
import { linkedin } from '../secrets';
import unsupportedMessage from '../../db/unsupportedMessage';
import { passport as dbPassport } from '../../db';

const OAuth2Strategy = LinkedInStrategy.Strategy;

export default (passport) => {
  if (!dbPassport || !dbPassport.linkedin || ! typeof dbPassport.linkedin === 'function') {
    console.warn(unsupportedMessage('passport-linkedin-oauth2'));
    return;
  }

  /*
  * OAuth Strategy taken modified from https://github.com/sahat/hackathon-starter/blob/master/config/passport.js
  *
  * - User is already logged in.
  *   - Check if there is an existing account with a provider id.
  *     - If there is, return an error message. (Account merging not supported)
  *     - Else link new OAuth account with currently logged-in user.
  * - User is not logged in.
  *   - Check if it's a returning user.
  *     - If returning user, sign in and we are done.
  *     - Else check if there is an existing account with user's email.
  *       - If there is, return an error message.
  *       - Else create a new account.
  */

  passport.use(new OAuth2Strategy({
    clientID: linkedin.clientID,
    clientSecret: linkedin.clientSecret,
    callbackURL: linkedin.callbackURL,
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true
  }, dbPassport.linkedin));
};
