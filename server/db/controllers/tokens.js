import express from 'express';
import UserModel from '../models/user';
import jwt from 'jwt-simple';
import moment from 'moment';
import { externalAPISecret } from '../../config/secrets';

export function token(req, res) {

  if (req.headers.email && req.headers.password) {   
  
    if (req.headers.email.indexOf('@uiba.co') !== -1 || req.headers.email === externalAPISecret.accessEmail) {
      // Fetch the appropriate user, if they exist
      UserModel.findOne({ email: req.headers.email }, function(err, user) {
        if (err || !user) {    
          // user cannot be found; may wish to log that fact here. For simplicity, just return a 401
          res.send('Authentication error', 401)
        }
        return user.comparePassword(req.headers.password, (err, isMatch) => {
          if (err) {
            // an error has occured checking the password. For simplicity, just return a 401
            res.send(err.response, 401)
          }
          if (isMatch) {  
            // Great, user has successfully authenticated, so we can generate and send them a token.  
            var expires = moment().add(7, 'days').valueOf()       

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
            res.send('Authentication error', 401)
          }
        });

      });
    } else {
      res.send('Authentication error: Account not whitelisted.', 401)
    }
  } else {
    res.send('Authentication error', 401)
  }

}


export default {
  token,
};