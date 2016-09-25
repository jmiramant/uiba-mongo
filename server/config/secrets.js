export const sessionSecret = process.env.SESSION_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU';

export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '114596459676-b30kskdonpjh9069evk4tk62ou8pis4g.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || '0Jg0XDNXlmM2UeDH6dXk8u-c',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export const linkedin = {
  clientID: process.env.LINKEDIN_CLIENTID || '7502url4wogimg',
  clientSecret: process.env.LINKEDIN_SECRET || 'Cbt1RZqeunrzRXP3',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/linkedin/callback'
};

export const sendinblue = {
  clientToken: process.env.SENDBLUE_TOKEN || '<TOKEN>'
}

export const externalAPISecret = {
  token: process.env.UIBA_API_SECRET || 'MvUHj6PG6UPfeA2CccMBwTFn',
  accessEmail: process.env.UIBA_API_SECRET || 'token@token.com'
}

export default {
  sessionSecret,
  google,
  externalAPISecret,
  linkedin
};
