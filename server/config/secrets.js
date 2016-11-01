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

export const sendInBlue = {
  clientToken: process.env.SENDBLUE_TOKEN || 'MaNzWRXC0ELdyOQ1'
}

export const externalAPISecret = {
  token: process.env.UIBA_API_SECRET || 'MvUHj6PG6UPfeA2CccMBwTFn',
  accessEmail: process.env.UIBA_API_SECRET || 'token@token.com'
}

export const zipCodeAPI = {
  key: process.env.zipCodeAPI_key || 'JCqjDuMQP0YpfmZglzDHV5yQI3faL0FvD5OhzB7pB6PRsO8OnLvjR49A7pLSqqn4',
}

export const aws = {
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID || 'AKIAJASIXYLAVU34AGHQ',
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY || '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'
}

export default {
  sessionSecret,
  google,
  externalAPISecret,
  linkedin,
  zipCodeAPI
};
