 // db.schoolname
import mongoose, { Schema } from 'mongoose';
import Schoolname from '../models/schoolname';

/**
 * List
 */
export function search(req, res) {
  let query = new RegExp(req.query.search, 'i');
  Schoolname
    .find({name: {$regex: query}})
    .limit(10)
    .exec((err, results) => {
      if (err) {
        return res.status(500).send('Something went wrong getting the data from SchoolNames endpoint');
      }
      return res.json(results);
  });
}

export default {
  search,
};
