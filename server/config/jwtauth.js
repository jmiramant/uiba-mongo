import url from 'url';
import  User from '../db/models/user';
import  jwt from 'jwt-simple';
import { externalAPISecret } from './secrets';

module.exports = function(req, res, next){
  var parsed_url = url.parse(req.url, true)
  /**
   * Take the token from:
   * 
   *  - the POST value access_token
   *  - the GET parameter access_token
   *  - the x-access-token header
   *    ...in that order.
   */
  var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"];

  if (token) {

    try {

      var decoded = jwt.decode(token, externalAPISecret.token)

      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400)        
      }

      User.findOne({ '_id': decoded.iss }, function(err, user){

        if (!err) {         
          req.user = user                 
          return next()
        }
      })

    } catch (err) {     
      res.status(400).send(err);
    }

  } else {
    res.status(400).send("Please provide an api key")
  }
}