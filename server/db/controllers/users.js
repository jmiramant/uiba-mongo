import User from '../models/user';
import Profile from '../models/profile';
import Recruiter from '../models/recruiter';
import Role from '../models/role';
import passport from 'passport';
import Company from '../models/company';
import async from 'async'
import mailer from '../../utils/email.js'
import _ from 'lodash';

const isApply = (req) => {
  return req.headers.referer.indexOf('/apply/') !== -1
}

const logRecruiter = (req, profId) => {
  if (req.headers.referer.split('/apply/').length > 1) {

    const properString = (str) => {
      return str.split('-').map((s) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
      }).join(' ');
    }

    const company = properString(req.headers.referer.split('/apply/')[1].split('/')[0]);
    const role = req.headers.referer.split('/apply/')[1].split('/')[1].split('?')[0];
    let rid;
    if (req.headers.referer.split('/apply/')[1].split('/')[1].split('?')[1]) {
      rid = req.headers.referer.split('/apply/')[1].split('/')[1].split('?')[1].split('&')[0].split('=')[1]
    } 

    if (role) {
      Role.findOne({'applicantCode': role}, (err, _role) => {
        if (!err && _role) {
          _role.applicants.push(profId);
          _role.appliedCount += 1;
          _role.save();
        }
      })
    }

    if (rid) {

      const rid = req.headers.referer.split('/apply/')[1].split('?rid=')[1].split('&')[0];

      Recruiter.findOne({
        key: rid
      }).exec((err, recruiter) => {
        if (!recruiter) {
          console.log('no recruiter with this ID')
          return false;
        }
        const companyObj = _.find(recruiter.credit, (obj) => {
          return obj.company === company
        })

        if (companyObj) {
          companyObj.candidate.push(profId);
        } else {
          recruiter.credit.push({
            company: company,
            candidate: [profId]
          });
        }
        recruiter.save()
      });

    }
  }
}

const resolveApplyRedirect = (req, profile, cb) => {
  const companyName = req.headers.referer.split('/apply/')[1].split('/')[0].split('?')[0];
  const nameLower = companyName.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ').join('_')
  Company.findOne({
    name_lower: nameLower
  }, (companyErr, _company) => {
    if (companyErr) return res.status(401).json({ message: companyErr });
    profile.apply = {
      applied: true,
      name: companyName,
      name_lower: _company.name_lower,
      company_id: _company._id
    };
    logRecruiter(req, profile._id);
    cb();
  })
}

/**
 * GET /user
 */
export function me(req, res) {
  
  if (!req.user) {
    console.log('Error in user /me query');
    return res.status(404).send('Something went wrong getting the data');
  }

  return res.json(req.user);
}

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({
        message: info.message
      });
    }
    if (user.isEmailVerified) {

      // Passport exposes a login() function on req (also aliased as
      // logIn()) that can be used to establish a login session
      const login = () => {
        return req.logIn(user, (loginErr) => {
          if (loginErr) return res.status(401).json({
            message: loginErr
          });
          return res.status(200).json({
            message: 'You have been successfully logged in.'
          });
        });
      }

      if (isApply(req)) {
        return Profile.findOne({
          service: 'email',
          user_id: user._id
        }, (profErr, _profile) => {
          if (profErr) console.log(profErr)
          const cb = () => {
            _profile.save( (err, prof) => {
              login();
            })
          }
          resolveApplyRedirect(req, _profile, cb)
        })
      } else {
        login();
      }


    } else {
      res.send(401, {
        message: 'This email is not yet verified. Please check your email to confirm the account.'
      });
    }
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  let user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({
    email: req.body.email
  }, (findErr, existingUser) => {
    if (existingUser && !existingUser.claim) {
      return res.status(409).json({
        message: 'Account with this email address already exists. Did you sign up with LinkedIn?'
      });
    }

    if (existingUser && existingUser.claim) {
      user = existingUser;
      user.claim = false;
      user.email = req.body.email;
      user.password = req.body.password;
    }
  
    const _profile = new Profile({
      user_id: user.id,
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      name: req.body.first + ' ' + req.body.last,
      service: 'email',
      isEmailVerified: false
    })
    const saveResolve = () => {
      return async.series({
        _profile: _profile.save,
        user: user.save
      }, function(saveErr, resp){
        if (saveErr) return next(saveErr);
        mailer.sendEmailConfirmation(user, req.headers.host)
        res.redirect(200, '/email-confirmation');

      });      
    }
    user.profile_id = _profile._id;

    if (isApply(req)) {
      resolveApplyRedirect(req, _profile, saveResolve)
    } else {
      saveResolve()    
    }

  });
}

export function emailConfirmation(req, res, next) {

  const token = req.params.token;

  if (!token) {
    return res.status(401).json({
      message: "Please pass a token"
    });
  }
  User.findOne({
    verifyEmailToken: token,
    verifyEmailTokenExpires: {
      $gt: Date.now()
    }
  }, (err, user) => {
    if (!user) {
      return res.status(404).json({
        message: "Token is not valid or expired."
      })
    }
    user.isEmailVerified = true;
    user.verifyEmailToken = undefined;
    user.verifyEmailTokenExpires = undefined;
    user.save((err) => {
      if (err) return next(err);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(401).json({
          message: loginErr
        });
        const path = user.role.includes(2) ? '/company-admin/dashboard' : '/profile'
        res.redirect(path);
      });
    })

  });

}

export function resendEmailConfirmation(req, res, next) {
  const email = req.body.email;

  User.findOne({
    'email': email,
    'isEmailVerified': false
  }, function(err, user) {
    let errMsg;
    !user ? (errMsg = 'We could not find this email or it as already been verifed.') : (errMsg = err)
    if (err || !user) return res.status(401).json({
      message: errMsg
    });

    mailer.sendEmailConfirmation(user, req.headers.host, (err, resp) => {
      err ? res.status(404).json(err) : res.status(200).json(resp)
    });
  });


}


/**
 * POST /role
 */

export function role(req, res) {

  const isRoleNumber = (role) => {
    return typeof(Number(role)) === 'number';
  };
  if (isRoleNumber(req.body.role)) {
    
    const roleDigit = Number(req.body.role);

    User.findOne({
      email: req.body.email
    }, (findErr, user) => {
      if (!user) {
        var user = new User();
        user.claim = true;
        user.email = req.body.email;
        user.role = [1];
      }
      const targetIndex = user.role.indexOf(roleDigit);
      const roleArr = user.role;

      if (roleDigit > 1 && targetIndex === -1) {
        _.uniq(roleArr.push(roleDigit));
        user.role = roleArr;

      } else if (roleDigit > 1) {

        roleArr.splice(roleArr.indexOf(roleDigit), 1)
        user.role = roleArr;

      } else {

        return res.status(404).send('Default value is 1 and cannot be removed.');

      }

      user.save((err, user) => {

        if (!user || err) {
          console.log('Error in user /create');
          return res.status(500).send('Something went wrong getting the data');
        }

        return res.json(user);

      });

    });

  } else {

    return res.status(500).send('User role must be a number.');

  }
}

export default {
  me,
  login,
  logout,
  role,
  signUp,
  emailConfirmation,
  resendEmailConfirmation
};