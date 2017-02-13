/* eslint-disable no-param-reassign */

import mongoose from 'mongoose';
import Company from '../models/company';
import Profile from '../models/profile';

const handleError = (res, err) => {
  return res.status(401).json({
    message: err
  });
};

export function get(req, res) {
  const respCb = (err, company) => {
    if (!company || err) {
      if (err) {
        return res.status(500).send({
          message: 'Company resource not found: ' + err.value
        });
      }
      return res.status(404).send({
        error: 'This company does not exist'
      });
    }
    return res.json(company);
  };

  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    Company.findById(req.params.id, respCb);
  } else {
    Company.findOne({name_lower: req.params.id}, respCb);
  }
}

export function typeahead(req, res) {
  const query = new RegExp(req.query.search, 'i');
  Company
    .find({
      name_lower: {
        $regex: query
      }
    })
    .limit(5)
    .exec((err, results) => {
      if (err) {
        return res.status(500).send({
          message: 'Company resource not found: ' + err.value
        });
      }
      return res.json(results);
    });
}

export function create(req, res) {
  Company.create({ ...req.body}, (err, company) => {
    if (err) return handleError(res, err);
    return res.json(company);
  });
}

export function update(req, res) {
  return Company.findById({
    _id: req.body._id
  }).exec((err, company) => {
    if (req.body.name) company.name = req.body.name;
    if (req.body.address_id) company.address_id = mongoose.Types.ObjectId(req.body.address_id); // eslint-disable-line new-cap
    if (req.body.description) company.description = req.body.description;
    if (req.body.foundedDate) company.foundedDate = req.body.foundedDate;
    if (req.body.size) company.size = req.body.size;
    if (req.body.websiteUrl) company.websiteUrl = req.body.websiteUrl;
    if (req.body.logoUrl) company.logoUrl = req.body.logoUrl;
    if (req.body.specialties) company.specialties = req.body.specialties;
    if (req.body.industry) company.industry = req.body.industry;

    // eslint-disable-next-line consistent-return
    company.save(companyErr => {
      if (companyErr) return handleError(res, companyErr);
      if (req.user.profile_id) {
        Profile.findById(req.user.profile_id, (_err, prof) => {
          if (_err) return handleError(res, _err);
          if (!prof) return res.status(404).json({message: 'Profile Not Found in Company Assoc.'});
          prof.company_id = company._id;
          prof.save();
          return res.json(company);
        });
      } else {
        return res.json(company);
      }
    });
  });
}

export function remove(req, res) {
  Company.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      throw err;
    }
    return res.status(200).json({
        id: req.params.id,
        message: 'This job has been deleted.'
      });
  });
}

export default {
  get,
  create,
  update,
  remove,
  typeahead,
};
