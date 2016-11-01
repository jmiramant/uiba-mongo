import mongoose, {
  Schema
} from 'mongoose';
import Company from '../models/company';
import Profile from '../models/profile';
/**
 * List
 */
export function get(req, res) {

  const respCb = (err, company) => {
    if (!company || err) {
      if (err) return res.status(500).send({
        message: 'Company resource not found: ' + err.value
      });
      return res.status(404).send({
        error: 'This company does not exist'
      });
    }
    return res.json(company);
  }

  if (req.params.companyName) {
    Company.findOne({
      "name_lower": req.params.companyName.toLowerCase()
    }).exec(respCb);
  } else {
    if (!req.user || !req.user.profile_id) {
      return res.status(403).send({
        error: 'No currentUser.'
      });
    } else {
      Profile.findById(req.user.profile_id, (err, prof) => {
        if (!prof) {
          return res.status(404).send({
            error: 'No company associated with this currentUser.'
          });
        }
        Company.findById(prof.company_id, respCb)
      })
    }
  }

}

export function typeahead(req, res) {
  const query = new RegExp(req.query.search, 'i');
  Company
    .find({name_lower: {$regex: query}})
    .limit(5)
    .exec((err, results) => {
      if (err) return res.status(500).send({error: err});
      return res.json(results);
    })
}

export default {
  get,
  typeahead,
};