export const sessionSecret = process.env.SESSION_SECRET || '<SESSION_SECRET>';

export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '<GOOGLE_CLIENTID>',
  clientSecret: process.env.GOOGLE_SECRET || '<GOOGLE_SECRET>',
  callbackURL: process.env.GOOGLE_CALLBACK || '<GOOGLE_CALLBACK>k'
};

export const linkedin = {
  clientID: process.env.LINKEDIN_CLIENTID || '<LINKEDIN_CLIENTID>',
  clientSecret: process.env.LINKEDIN_SECRET || '<LINKEDIN_SECRET>',
  callbackURL: process.env.GOOGLE_CALLBACK || '<GOOGLE_CALLBACK>'
};

export const sendInBlue = {
  clientToken: process.env.SENDBLUE_TOKEN || '<SENDBLUE_TOKEN>'
}

export const externalAPISecret = {
  token: process.env.UIBA_API_SECRET || '<UIBA_API_SECRET>',
  accessEmail: process.env.UIBA_API_SECRET || '<UIBA_API_SECRET>m'
}

export const zipCodeAPI = {
  key: process.env.zipCodeAPI_key || '<zipCodeAPI_key>',
}

export const aws = {
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID || '<AWS_ACCESS_KEY_ID>',
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY || '<AWS_SECRET_ACCESS_KEY>t'
}

export default {
  sessionSecret,
  google,
  externalAPISecret,
  linkedin,
  zipCodeAPI
};
