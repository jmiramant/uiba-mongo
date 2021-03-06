import async from 'async';
import _ from 'lodash';
import passport from 'passport';
import User from '../models/user';
import Profile from '../models/profile';
import Recruiter from '../models/recruiter';
import Role from '../models/role';
import Company from '../models/company';
import mailer from '../../utils/email.js';

const isApply = (req) => {
  return req.headers.referer.indexOf('/apply/') !== -1;
};

const handleError = (res, err) => {
  return res.status(404).json({
    message: err
  });
};

const logRecruiter = (req, profId) => {
  if (req.headers.referer.split('/apply/').length > 1) {

    const company = req.headers.referer.split('/apply/')[1].split('/')[0];

    let role;
    const isRole = req.headers.referer.split('/apply/')[1].split('/').length > 1
    if (isRole) role = req.headers.referer.split('/apply/')[1].split('/')[1].split('?')[0];

    if (isRole) {

      Role.findOne({
        'applicantCode': role
      }, (err, _role) => {
        if (!err && _role) {
          _role.applicants.push(profId);
          _role.save();
        }
      })
    }

    const isRid = req.headers.referer.split('/apply/')[1].split('?')[1]

    if (isRid) {

      const rid = isRid.split('&')[0].split('=')[1];

      Recruiter.findOne({
        key: rid
      }).exec((err, recruiter) => {
        if (!recruiter) {
          console.log('no recruiter with this ID')
          return false;
        }
        const companyObj = _.find(recruiter.credit, (obj) => {
          return obj.company.toLowerCase() === company
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
  const nameLower = companyName.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-`~()]/g, "").split(' ').join('_')
  const roleUid = req.headers.referer.split('/apply/')[1].split('/')[1];

  Company.findOne({
    name_lower: nameLower
  }, (companyErr, _company) => {
    if (companyErr) return res.status(401).json({
      message: companyErr
    });

    profile.apply = {
      applied: true,
      name: companyName,
      name_lower: _company.name_lower,
      company_id: _company._id,
    };

    if (roleUid) profile.apply.role_code = roleUid.split('?')[0];

    logRecruiter(req, profile._id);
    cb();
  })
}

/**
 * GET /user
 */
export function me(req, res) {
  if (!req.user) {
    return res.status(404).send('Something went wrong getting the data');
  }
  return res.json(req.user);
}

export function login(req, res, next) {
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({
        message: info.message
      });
    }
    if (user.isEmailVerified) {

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
          if (profErr) return res.status(401).json({ message: profErr });
          if (!_profile) return res.status(404).json({ message: "Could not find user." });
          const cb = () => {
            _profile.save((err, prof) => {
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

export function logout(req, res) {
  req.logout();
  res.redirect('/');
}

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

    Profile.findOne({
      email: req.body.email
    }, (profErr, claimProfile) => {
      if (profErr) return res.status(500).send(profErr);

      let _profile = new Profile();

      if (claimProfile) {
        _profile = claimProfile;
        _profile.claim = false;
      }

      _profile.user_id = user.id;
      _profile.firstName = req.body.first;
      _profile.lastName = req.body.last;
      _profile.email = req.body.email;
      _profile.name = req.body.first + ' ' + req.body.last;
      _profile.service = 'email';
      _profile.isEmailVerified = false;

      const saveResolve = () => {
        _profile.save((pErr, profile) => {
          if (pErr) return handleError(res, pErr)
          user.save((uErr, _user) => {
            if (uErr) return handleError(res, uErr)

            mailer.sendEmailConfirmation(user, req.headers.host)
            return res.redirect(200, '/email-confirmation');
          });
        });
      }

      user.profile_id = _profile._id;

      if (isApply(req)) {
        resolveApplyRedirect(req, _profile, saveResolve)
      } else {
        saveResolve()
      }

    });
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
          console.log('Error saving user in role');
          return res.status(500).send('Something went wrong getting the data');
        }

        return res.json(user);

      });

    });

  } else {

    return res.status(500).send('User role must be a number.');

  }
}

export function company(req, res) {

  if (!req.body.companyName) return res.status(404).send('Please provide a company name from the "name_lower" field of a company this key should be added as "companyName" in the post data.');
  if (!req.body.email) return res.status(404).send('Please provide an email.');

  Company.findOne({
    name_lower: req.body.companyName
  }).exec((cErr, company) => {
    if (cErr) return res.status(500).send(cErr);
    if (!company) return res.status(404).send('Could not find that company.');

    Profile.findOne({
      email: req.body.email
    }, (profErr, _prof) => {

      if (profErr) return res.status(500).send(profErr);

      User.findOne({
        email: req.body.email
      }, (uErr, _user) => {
        if (uErr) return res.status(500).send(uErr);

        let user = _user;
        let prof = _prof;

        if (!prof) {
          prof = new Profile();
          prof.claim = true;
          prof.email = req.body.email;
        }
        prof.company_id = company._id;

        if (!user) {
          user = new User();
          user.claim = true;
          user.email = req.body.email;
        }
        user.role = [1, 2];

        user.save((userErr) => {
          if (userErr) return handleError(res, userErr);
          return prof.save((prfErr, profile) => {
            if (prfErr) return handleError(res, prfErr);
            return res.json(profile);
          });
        });
      });
    });
  });
}

export default {
  me,
  login,
  logout,
  company,
  role,
  signUp,
  emailConfirmation,
  resendEmailConfirmation
};
