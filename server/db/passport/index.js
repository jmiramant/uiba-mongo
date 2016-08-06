import deserializeUser from './deserializeUser';
import google from './google';
import linkedin from './linkedin';
import local from './local';

export { deserializeUser, deserializeProfile, google, linkedin, local };

export default {
  deserializeUser,
  google,
  local,
  linkedin,
};
