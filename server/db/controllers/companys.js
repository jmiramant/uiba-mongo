import mongoose, { Schema } from 'mongoose';
import Company from '../models/company';

/**
 * List
 */
export function get(req, res) {

  const name = req.params.companyName

  Company.findOne({"name_lower": name.toLowerCase()}).exec( (err, company) => {
    if (!company || err) {
      if (err) return res.status(500).send({message: 'Company resource not found: ' + err.value});
      return res.status(404).send({error: 'This company does not exisit'});
    }
    return res.json(company);
  });
}


export default {
  get,
};
