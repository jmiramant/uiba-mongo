import express from 'express';
import UserModel from '../models/user';
import jwt from 'jwt-simple';
import moment from 'moment';
import { externalAPISecret } from '../../config/secrets';

export function token(req, res) {

  if (req.headers.email && req.headers.password) {

    const isApprovedEmail = req.headers.email === externalAPISecret.accessEmail;

    if (req.headers.email.indexOf('@uiba.co') !== -1 || isApprovedEmail) {
      // Fetch the appropriate user, if they exist
      UserModel.findOne({ email: req.headers.email }, function(err, user) {

        if (err || !user || !user.comparePassword || ( !isApprovedEmail || !user.isEmailVerified)) {    
          // user cannot be found; may wish to log that fact here. For simplicity, just return a 401
          return res.status(401).send('Authentication');
        } else {
          return user.comparePassword(req.headers.password, (err, isMatch) => {
            if (err) {
              // an error has occured checking the password. For simplicity, just return a 401
              return res.status(401).send(err.response);
            }
            if (isMatch) {  
              // Great, user has successfully authenticated, so we can generate and send them a token.  
              var expires = moment().add(7, 'days').valueOf(); 

              var token = jwt.encode(
                {
                  iss: user.id,
                  exp: expires
                }, 
                externalAPISecret.token
              );            
              return res.json({
                token : token,
                expires : expires,
                user : user.toJSON()
              });
            } else {            
              return res.status(401).send('Authentication error');
            }
          });
        }
      });
    } else {
      return res.status(401).send('Authentication error: Account not whitelisted.');
    }
  } else {
    return res.status(401).send('Authentication error');
  }

}


export default {
  token,
};

