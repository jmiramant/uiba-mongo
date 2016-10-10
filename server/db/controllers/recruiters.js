import mongoose, { Schema } from 'mongoose';
import moment from 'moment';
import Recruiter from '../models/recruiter';

const handleError = (res, err) => {
  console.log(err);
  return res.status(401).json({ message: err });
}

export function create (req, res) {
  const rand = Math.random().toString(36).substring(12);
  const recruiter = new Recruiter({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    key: req.body.firstName.toLowerCase() + req.body.lastName.toLowerCase() + rand
  });

  recruiter.save( (err, recruiter) => {
    if (err) return handleError(res, err);
    return res.status(200).json(recruiter);;
  })
}

export default {
  create
};
