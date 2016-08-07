import Profile from '../models/profile';

/**
 * List
 */
export function me(req, res) {
  
  Profile.find({"user_id": "1Ps8P1F-q5"}).exec((err, profile) => {
    if (err) {
      console.log('Error in "profile/me" query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(profile[0]);
  });
}

export default {
  me,
};
