/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */

import { Strategy as LocalStrategy } from 'passport-local';
import { passport as dbPassport } from '../../db';
import unsupportedMessage from '../../db/unsupportedMessage';

export default (passport) => {
  if (!dbPassport || !dbPassport.local || ! typeof dbPassport.local === 'function') {
    console.warn(unsupportedMessage('passport-local'));
    return;
  }

  passport.use(new LocalStrategy({
    usernameField: 'email', 
    passReqToCallback: true
  }, dbPassport.local));
};
