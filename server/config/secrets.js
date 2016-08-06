/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU';
export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '62351010161-eqcnoa340ki5ekb9gvids4ksgqt9hf48.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export const linkedin = {
  clientID: process.env.LINKEDIN_CLIENTID || '7502url4wogimg',
  clientSecret: process.env.LINKEDIN_SECRET || 'Cbt1RZqeunrzRXP3',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/linkedin/callback'
};

export default {
  sessionSecret,
  google,
  linkedin
};
