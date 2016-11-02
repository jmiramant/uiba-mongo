import mongoose, {
  Schema
} from 'mongoose';
import Company from '../models/company';
import Profile from '../models/profile';

const handleError = (res, err) => {
  console.log(err)
  return res.status(401).json({
    message: err
  });
}

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

export function list(req, res) {

  const name = req.params.companyName

  Company.findOne({"name_lower": name.toLowerCase()}).exec( (err, company) => {
    if (!company || err) {
      if (err) return res.status(403).send({message: 'Company resource not found: ' + err.value});
      return res.status(412).send({error: 'This company does not exisit'});
    }
    return res.json(company);
  });

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
      if (err) return res.status(500).send({
        error: err
      });
      return res.json(results);
    })
}

export function create(req, res) {

  Company.create({
    name: req.body.name,
    address_id: req.body.address_id,
    description: req.body.description,
    foundedDate: req.body.foundedDate,
    size: req.body.size,
    websiteUrl: req.body.websiteUrl,
    logoUrl: req.body.logoUrl,
    specialties: req.body.specialties,
    industry: req.body.industry
  }, function(err, company) {

    if (err) return handleError(res, err);

    return res.json(company);

  })

}

export function update(req, res) {

  return Company.findById({
    "_id": req.body._id
  }).exec((err, company) => {

    if (req.body.name) company.name = req.body.name;
    if (req.body.address_id) company.address_id = req.body.address_id;
    if (req.body.description) company.description = req.body.description;
    if (req.body.foundedDate) company.foundedDate = req.body.foundedDate;
    if (req.body.size) company.size = req.body.size;
    if (req.body.websiteUrl) company.websiteUrl = req.body.websiteUrl;
    if (req.body.logoUrl) company.logoUrl = req.body.logoUrl;
    if (req.body.specialties) company.specialties = req.body.specialties;
    if (req.body.industr) company.industry = req.body.industry;
    
    company.save(err => {
      if (err) return handleError(res, err);
      return res.json(job);
    });

  });
}

export function remove(req, res) {
  Company.findByIdAndRemove(req.params.id, function(err, offer) {
    if (err) {
      throw err;
    }
    return res.status(200).json({
        id: req.params.id,
        message: 'This job has been deleted.'
      })
  })
}

export default {
  get,
  create,
  update,
  remove,
  typeahead,
};