import mongoose, {
  Schema
} from 'mongoose';
import Address from '../models/address';
import {
  zipCodeAPI
} from '../../config/secrets';
import request from 'request';

const handleError = (res, err) => {
  return res.status(401).json({
    message: err
  });
}

const typeRequest = (type, target) => {
  const types = {
    company: {
      attr: 'company_id',
      id: mongoose.Types.ObjectId(target)
    },
    user: {
      attr: 'user_id',
      id: mongoose.Types.ObjectId(target)
    },
    profile: {
      attr: 'profile_id',
      id: mongoose.Types.ObjectId(target)
    }
  };
  
  return {[types[type].attr]: types[type].id};
};

export function autofill(req, res) {
  const url = 'http://www.zipcodeapi.com/rest/' + zipCodeAPI.key + '/info.json/' + req.query.search + '/radians'
  request(url, (error, response, body) => {
    return res.json(JSON.parse(body));
  })
}

export function me(req, res) {

  Address.findOne(typeRequest('profile', req.user.profile_id)).exec((err, address) => {
    if (err) return handleError(res, err);
    if (!address) return handleError(res, 'No address');
    return res.status(200).json(address);

  });

}

export function get(req, res) {
  const name = req.params.id;
  const type = req.search.type ? req.search.type : 'profile'
  let query;

  if (type === 'profile') {
    query = typeRequest('profile', req.user.profile_id);
  } else {
    query = typeRequest(type, id); 
  }

  Address.find({query}).exec((err, address) => {
    if (err) {
      console.log('Error in "address/me" query');
      return res.status(500).send('Something went wrong getting the address data');
    }
    return res.status(200).json(address);
  });
}

export function create(req, res) {
  Address.create({
    profile_id: req.user.profile_id,
    zip_code: req.body.zip_code,
    lat: req.body.lat,
    lng: req.body.lng,
    city: req.body.city,
    state: req.body.state,
    timezone: req.body.timezone["timezone_abbr"],
    acceptable_city_names: req.body.acceptable_city_names
  }, function(err, address) {
    if (err) return handleError(res, err);
    return res.json(address);
  })
}

export function update(req, res) {
  Address.findOne({
    "profile_id": mongoose.Types.ObjectId(req.user.profile_id)
  }).exec((err, address) => {

    address.zip_code = req.body.zip_code;
    address.lat = req.body.lat;
    address.lng = req.body.lng;
    address.city = req.body.city;
    address.state = req.body.state;
    address.timezone = req.body.timezone["timezone_abbr"];
    address.acceptable_city_names = req.body.acceptable_city_names;

    address.save(err => {
      if (err) return handleError(res, err);
      return res.json(address);
    });

  })
}

export function remove(req, res) {
  Address.findByIdAndRemove(req.params.id, function(err, address) {
    if (err) {
      return res.status(401).json({
        message: err
      });
    }
    return res.status(200).json({
      id: req.params.id,
      message: 'This address has been deleted.'
    })
  })
}

export default {
  me,
  get,
  create,
  update,
  remove,
  autofill,
};