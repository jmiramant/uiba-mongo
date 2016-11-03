export const sessionSecret = process.env.SESSION_SECRET

export const google = {
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
};

export const linkedin = {
  clientID: process.env.LINKEDIN_CLIENTID,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
};

export const sendInBlue = {
  clientToken: process.env.SENDBLUE_TOKEN
}

export const externalAPISecret = {
  token: process.env.UIBA_API_SECRET,
  accessEmail: process.env.UIBA_API_SECRET
}

export const zipCodeAPI = {
  key: process.env.zipCodeAPI_key,
}

export const aws = {
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY
}

export default {
  sessionSecret,
  google,
  externalAPISecret,
  linkedin,
  zipCodeAPI
};
