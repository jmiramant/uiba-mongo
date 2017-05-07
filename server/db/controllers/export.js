import mongoose from 'mongoose';
import async from 'async';
import _ from 'lodash';
import School from '../models/school';
import Profile from '../models/profile';
import Project from '../models/project';
import Skill from '../models/skill';
import Job from '../models/job';
import Interest from '../models/interest';
import Language from '../models/language';
import Recruiter from '../models/recruiter';
import Address from '../models/address';

const handleError = (res, err) => {
  return res.status(404).json({
    message: err
  });
};

const renameKey = (o, oldKey, newKey) => {
  if (oldKey !== newKey) {
    Object.defineProperty(o, newKey,
      Object.getOwnPropertyDescriptor(o, oldKey));
    delete o[oldKey];
  }
};

const exportQueryByDate = (req, res, queryDate, query, type) => {
  if (queryDate.toString() === 'Invalid Date') {
    return handleError(res, 'There is a problem with your Epoch datetime. Please provide a provide a properly formatted timestamp.');
  }

  const parallels = {};
  const models = {
    language: Language,
    project: Project,
    school: School,
    interest: Interest,
    profile: Profile,
    skill: Skill,
    job: Job
  };

  _.forEach(models, (v, k) => {
    parallels[k] = (callback) => {
      if (k === 'profile') {
        let q = query;
        if (type === 'updated') {
          q = {...query
          };
          renameKey(q, 'updatedAt', 'childUpdatedAt');
        }
        v.find(q)
          .limit(500)
          .exec((err, prof) => {
            callback(err, prof);
          });
      } else {
        v.find(query)
          .exec((err, prof) => {
            callback(err, prof);
          });
      }
    };
  });

  parallels.profileCount = (callback) => {
    Profile.count(query)
      .exec((err, resp) => {
        callback(err, resp);
      });
  };

  return async.parallel(parallels, (err, resp) => {
    if (err) {
      return res.status(404).send('Something went wrong getting the skills data');
    }

    const formatted = {
      details: {
        timestamp: queryDate,
        returnedUsers: resp.profile.length,
        totalUsers: resp.profileCount,
        paginated: resp.profileCount !== resp.profile.length
      },
      data: JSON.parse(JSON.stringify(resp.profile))
    };

    _.forEach(formatted.data, (user) => {
      _.forEach(resp, (v, k) => {
        if (k !== 'profile' && k !== 'profileCount') {
          return user[k] = _.filter(v, (item) => {
            if (item.profile_id) {
              return item.profile_id.toString() === user._id.toString();
            }
            return false;
          });
        }
      });
    });

    return res.status(200).json(formatted);
  });
};

const exportUpdatedByDate = (req, res, queryDate) => {
  if (queryDate.toString() === 'Invalid Date') {
    return handleError(res, 'There is a problem with your Epoch datetime. Please provide a provide a properly formatted timestamp.');
  }

  Profile.find({
    childUpdatedAt: {
      $gte: queryDate
    }
  }).exec((profErr, profiles) => {
    if (profErr) {
      return res.status(404).send('There are no profiles updated in before this time.');
    }

    const profileIds = _.map(profiles, (p) => {
      return mongoose.Types.ObjectId(p._id);
    });

    const parallels = {};

    const models = {
      language: Language,
      project: Project,
      school: School,
      interest: Interest,
      skill: Skill,
      job: Job,
      address: Address
    };

    _.forEach(models, (v, k) => {
      parallels[k] = (callback) => {
        v.find({
          profile_id: {
            $in: profileIds
          }
        })
        .exec((err, prof) => {
          callback(err, prof);
        });
      };
    });

    parallels.profileCount = (callback) => {
      Profile.count({
        childUpdatedAt: {
          $gte: queryDate
        }
      }).exec((err, resp) => {
        callback(err, resp);
      });
    };

    return async.parallel(parallels, (err, resp) => {
      if (err) {
        return res.status(404).send('Something went wrong getting the skills data');
      }

      const formatted = {
        details: {
          timestamp: queryDate,
          returnedUsers: profiles.length,
          totalUsers: resp.profileCount,
          paginated: resp.profileCount !== profiles.length
        },
        data: JSON.parse(JSON.stringify(profiles))
      };

      _.forEach(formatted.data, (user) => {
        _.forEach(resp, (v, k) => {
          if (k !== 'profile' && k !== 'profileCount') {
            return user[k] = _.filter(v, (item) => {
              if (item.profile_id) {
                return item.profile_id.toString() === user._id.toString();
              }
              return false;
            });
          }
        });
      });

      return res.status(200).json(formatted);
    });
  });
};

const exportQueryByProfiles = (req, res, profiles) => {
  const profIds = _.map(profiles, pf => pf._id);
  const parallels = {};
  const models = {
    language: Language,
    project: Project,
    school: School,
    interest: Interest,
    skill: Skill,
    job: Job
  };


  _.forEach(models, (v, k) => {
    parallels[k] = (callback) => {
      v.find({
          profile_id: {
            $in: profIds
          }
        })
        .exec((err, asset) => {
          callback(err, asset);
        });
    };
  });

  return async.parallel(parallels, (err, resp) => {
    if (err) {
      return res.status(404).send('Something went wrong getting this aggregate data');
    }

    const formatted = {
      details: {
        totalUsers: profiles.length,
      },
      data: JSON.parse(JSON.stringify(profiles))
    };

    _.forEach(formatted.data, (user) => {
      _.forEach(resp, (v, k) => {
        return user[k] = _.filter(v, (item) => {
          if (item.profile_id) {
            return item.profile_id.toString() === user._id.toString();
          }
          return false;
        });
      });
    });

    return res.status(200).json(formatted);
  });
};

export function updated(req, res) {
  const queryDate = new Date(Number(req.params.datetime));
  const query = {
    updatedAt: {
      $gte: queryDate
    }
  };
  return exportUpdatedByDate(req, res, queryDate, query, 'updated');
}

export function created(req, res) {
  const queryDate = new Date(Number(req.params.datetime));

  const query = {
    createdAt: {
      $gte: queryDate
    }
  };
  return exportQueryByDate(req, res, queryDate, query, 'created');
}

export function list(req, res) {
  const lowerName = req.query.target.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-`~()]/g, "").split(' ').join('_')
  const query = {
    ['apply.' + req.query.attr]: {
      $in: [lowerName, req.query.target]
    }
  };
  Profile.find(query).exec((err, profiles) => {
    return exportQueryByProfiles(req, res, profiles);
  });
}

export function recruiter(req, res) {
  Recruiter.findOne({
    key: req.params.key
  }).exec((err, recruiter) => {
    Array.prototype.unique = function() {
      var a = this.concat();
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i].toString() === a[j].toString())
            a.splice(j--, 1);
        }
      }
      return a;
    };

    let profIds = _.reduce(recruiter.credit, (a, b) => {
      return a.concat(b.candidate);
    }, []);

    profIds = profIds.unique();

    Profile.find({
      _id: {
        $in: profIds
      }
    }).exec((_err, profs) => {
      return exportQueryByProfiles(req, res, profs);
    });
  });
}

export default {
  list,
  created,
  updated,
  recruiter
};
