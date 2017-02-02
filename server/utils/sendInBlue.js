import sendinblue from 'sendinblue-api';
import {
  sendInBlue
} from '../config/secrets';
import request from 'axios';
import _ from 'lodash';

const sendinObj = new sendinblue({
  "apiKey": sendInBlue.clientToken
});

const identifyUser = (prof, user) => {

  sendinObj.get_lists({
    page: 1,
    page_limit: 50
  }, (err, lists) => {
    const indentList = _.find(lists.data.lists, (l) => {return l.name.toString() === 'identified_contacts';})
    
    let admin = false;
    if (user.role.indexOf(2) !== -1) admin = true;


    const data = {
      "email" : prof.email,
      "attributes": {
        "FIRSTNAME": prof.firstName,
        "LASTNAME": prof.lastName,
        "NAME": prof.name,
        "USER_ID": prof.user_id,
        "PROFILE_ID": prof._id,
        "ADMIN": admin
      },
      listid: [indentList.id]
    };

    if (prof.apply.name) data["attributes"]["COMPANYAPPLY"] = prof.apply.name;

    sendinObj.create_update_user(data, (err, _user) => {
      return _user
    });

  })
}

const loginUser = (user, cb) => {


  const data = {
    "email" : user.email,
    "attributes": {
      "FIRSTNAME": user.firstName,
      "LASTNAME": user.lastName,
      "NAME": user.name,
      "USER_ID": user.user_id,
      "PROFILE_ID": user._id
    }
  };


  sendinObj.create_update_user(data, (err, _user) => {
    return _user
  });

}

module.exports = {
  identifyUser,
  loginUser
};