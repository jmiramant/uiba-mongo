import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { google } from '../secrets';
import unsupportedMessage from '../../db/unsupportedMessage';
import { passport as dbPassport } from '../../db';

export default (passport) => {
  if (!dbPassport || !dbPassport.google || ! typeof dbPassport.google === 'function') {
    console.warn(unsupportedMessage('passport-google-oauth'));
    return;
  }
  passport.use(new GoogleStrategy({
    clientID: google.clientID,
    clientSecret: google.clientSecret,
    callbackURL: google.callbackURL
  }, dbPassport.google));
};
