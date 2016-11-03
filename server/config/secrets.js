export const sessionSecret = process.env.SESSION_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU';

export const linkedin = {
  clientID: process.env.LINKEDIN_CLIENTID || '7502url4wogimg',
  clientSecret: process.env.LINKEDIN_SECRET || 'Cbt1RZqeunrzRXP3',
  callbackURL: process.env.LINKEDIN_CALLBACK || '/auth/linkedin/callback'
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

export default {
  sessionSecret,
  externalAPISecret,
  linkedin,
  zipCodeAPI
};