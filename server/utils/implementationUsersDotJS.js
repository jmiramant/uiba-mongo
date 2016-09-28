
router.post('/users/signup', function(req, res, next) {
  var body = req.body;


  var errors = utils.validateSignUpForm(body);
  if (errors) {
    return res.status(403).json(errors);
  }

  isUserUnique(body, function(err) {
    if (err) {
      res.status(403).json(err);
    }

    var hash = bcrypt.hashSync(body.password.trim(), 10);
    var user = new User({
      name: body.name.trim(),
      username: body.username.trim(),
      email: body.email.trim(),
      password: hash,
      admin: false,
      isEmailVerified: false
    });

    user.save(function(err, user) {
      if (err) throw err;

      email.sendWelcomeEmail(user, req.headers.host); //send welcome email w/ verification token

      var token = utils.generateToken(user);

      user = utils.getCleanUser(user);

      res.json({
        user: user,
        token: token
      });
    });

  });
});



//currently validating uniqueness for username
router.post('/users/validate/fields', function(req, res, next) {
  var body = req.body;

  isUserUnique(body, function(err) {
    if (err) {
      res.status(403).json(err);
    } else {
      return res.json({});
    }
  });
});

//get current user from token
router.get('/me/from/token', function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    });
  }

  // decode token
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) throw err;

    //return user using the id from w/in JWTToken
    User.findById({
      '_id': user._id
    }, function(err, user) {
      if (err) throw err;

      user = utils.getCleanUser(user); //dont pass password and stuff

      //note: you can renew token by creating new token(i.e. refresh it) w/ new expiration time at this point, but I'm passing the old token back.
      // var token = utils.generateToken(user);

      res.json({
        user: user,
        token: token
      });

    });
  });
});


router.get('/resendValidationEmail', expressJwt({
  secret: process.env.JWT_SECRET
}), function(req, res, next) {

  User.findById({
    '_id': req.user._id
  }, function(err, user) {
    if (err) throw err;

    //send welcome email w/ verification token
    email.sendWelcomeEmail(user, req.headers.host, function(err) {
      if (err) {
        res.status(404).json(err);
      } else {
        res.send({
          message: 'Email was resent'
        })
      }
    });
  });
});


router.post(
  '/updateEmail',
  expressJwt({
    secret: process.env.JWT_SECRET
  }),
  function(req, res, next) {

    var newEmail = req.body.email && req.body.email.trim();

    User.findOneAndUpdate({
      '_id': req.user._id
    }, {
      email: newEmail
    }, {
      new: true
    }, function(err, user) {
      if (err) throw err;

      console.dir(user.toJSON());
      //send welcome email w/ verification token
      email.sendWelcomeEmail(user, req.headers.host);

      res.json({message: 'Email was updated'});

    });
  });




//get current user from email-token(from w/in welcome email)
router.get('/validateEmail/:token', function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.params.token;
  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    });
  }

  User.findOne({
    verifyEmailToken: req.params.token,
    verifyEmailTokenExpires: {
      $gt: Date.now()
    }
  }, function(err, user) {

    if (!user) {
      return res.status(404).json({
        message: 'Email token is not valid or has expired'
      });
    }

    user.isEmailVerified = true;
    user.verifyEmailToken = undefined;
    user.verifyEmailTokenExpires = undefined;
    user.save(function(err) {
      user = utils.getCleanUser(user); //dont pass password and stuff
      var token = utils.generateToken(user);
      res.json({
        user: user,
        token: token
      });
    });
  });
});
