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

  passport.use(new OAuth2Strategy({
    clientID: linkedin.clientID,
    clientSecret: linkedin.clientSecret,
    callbackURL: linkedin.callbackURL,
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true,
    passReqToCallback: true
  }, dbPassport.linkedin));
};
