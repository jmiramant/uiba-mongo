import Profile from '../models/profile';

/**
 * List
 */
export function all(req, res) {
  Profile.find({}).exec((err, profiles) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(topics);
  });
}
export default {
  all,
};
