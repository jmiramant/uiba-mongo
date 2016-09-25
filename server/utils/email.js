const sendinblue = require('sendinblue-api');
import { sendInBlue } from './secrets';
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
          varn = buf.toString('hex');
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
      function(user, done) {
        mailer.sendEmailWithTemplate({
          "From": process.env.FROM_EMAIL,
          "To": user.email,
          "TemplateId": 491642,
          "TemplateModel": {
            "product_name": "Uiba Team",
            "name": user.name,
            "action_url": host + '/validateEmail/' + user.verifyEmailToken,
            "username": user.username,
            "sender_name": "Uiba Team",
            'sender_name_Value': 'Jason',
            'product_name_Value': 'email-auth',
            "product_address_line1": "11 Grand Central",
            "product_address_line2": "New York, NY"
          }
        }, done);
      }
    ],
    function(err) {
      if (err) {
        console.log('Could not send welcome email to: ' + user.email);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send welcome email to: ' + user.email
          });
        }
      } else {
        if (finalCB) {
          finalCB();
        }
      }
    });

}

module.exports = {
  sendEmailConfirmationEmail
};