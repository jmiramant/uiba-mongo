import mongoose, { Schema } from 'mongoose';
import School from '../models/school';
import Profile from '../models/profile';
import Project from '../models/project';
import Skill from '../models/skill';
import Job from '../models/job';
import Language from '../models/language';
import async from 'async'
import moment from 'moment';
import _ from 'lodash';

const handleError = (res, err) => {
  return res.status(404).json({ message: err }); 
}

const exportQuery = (req, res, queryDate, query) => {

  if (queryDate.toString() === 'Invalid Date') {
    return handleError(res, 'There is a problem with your Epoch datetime. Please provide a provide a properly formatted timestamp.')
  }
  
  const parallels = {};
  const models = {
                    language: Language,
                    project:  Project,
                    school:   School,
                    profile:  Profile,
                    skill:    Skill,
                    job:      Job
                  };


  _.forEach(models, (v,k) => {
    parallels[k] = (callback) => {
      if (k === 'profile') {
        v.find(query)
          .limit(500)
          .exec( (err, prof) => {
          callback(err, prof);
        })
      } else {
        v.find(query)
          .exec( (err, prof) => {
          callback(err, prof);
        })
      }
    }
  });

  parallels['profileCount'] = (callback) => {
    Profile.count(query)
      .exec( (err, resp) => {
        callback(err, resp)
      })
  }

  return async.parallel(parallels, (err, resp) => {
    if (err) {
      return res.status(500).send('Something went wrong getting the skills data');
    }
    
    const formatted = {
      details: {
        timestamp: queryDate,
        returnedUsers: resp.profile.length,
        totalUsers: resp.profileCount,
        paginated: resp.profileCount !== resp.profile.length
      },
      data: JSON.parse(JSON.stringify(resp.profile))
    }

    _.forEach(formatted.data, (user, i) => {
      _.forEach(resp, (v, k) => {
        if (k !== 'profile' && k !== 'profileCount') {
          return user[k] = _.filter(v , (item) => {return item.profile_id.toString() === user._id.toString()})
        }
      });
    })
    
    return res.status(200).json(formatted);
  });
}

export function updated(req, res, next) {
  const queryDate = new Date(Number(req.params.datetime));
  const query = {updatedAt: {$gte: queryDate}};
  return exportQuery(req, res, queryDate, );
}

export function created(req, res) {
  const queryDate = new Date(Number(req.params.datetime));
  const query = {createdAt: {$gte: queryDate}};
  return exportQuery(req, res, queryDate, );
}

export default {
  created,
  updated,
};
