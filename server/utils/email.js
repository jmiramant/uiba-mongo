const sendinblue = require('sendinblue-api');
import { sendInBlue } from '../config/secrets';
const sendinObj = new sendinblue({ "apiKey": sendInBlue.clientToken});

const async = require('async');
const crypto = require('crypto');

if (!process.env.FROM_EMAIL) {
  console.log('Please set: FROM_EMAIL environment variable. This is a validated email address to send emails from to other users for email verification, reset pwd etc')
  process.exit();
}

const sendEmailConfirmation = (user, host, cb) => {
  host = host.indexOf('localhost') >= 0 ? 'http://' + host : 'https://' + host;

  async.waterfall([
      function(done) {
        crypto.randomBytes(15, function(err, buf) {
          const token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {

        user.verifyEmailToken = token;
        user.verifyEmailTokenExpires = Date.now() + 3600000 * 24; // 24 hours

        user.save(function(err) {
          done(err, user);
        });
      },
      (user, done) => {
        
        let data = { "to" : {"josh@miramant.me": "Josh Miramant"},
          "from" : ["info@uiba.co", "The Uiba Team"],
          "subject" : "Welcome to Uiba! Please Verify your Email",
          "html" : "<h2>Welcome to Uiba!</h2><br/>Thank you for signing up.<br/>Please verify your email: <a href=" + host + "/validateEmail/" + user.verifyEmailToken + ">Click Here</a><br/><h4>The Uiba Team</h4>",
        }
 
        sendinObj.send_email(data, (err, resp) => {
            if (err) {
              if (cb) {
                cb(err);
              } else {
                return
              }
            } else {
              if (cb) {
                cb(null, resp);
              }
            }
        });

      }
    ],
    function(err) {
      if (err) {
        console.log('Could not send welcome email to: ' + user.email);
        if (cb) {
          cb({
            message: 'Could not send welcome email to: ' + user.email
          });
        }
      } else {
        if (cb) {
          cb();
        }
      }
    });

}

module.exports = {
  sendEmailConfirmation
};