import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';
import validator from 'validator';


export function validateLoginHelper (login, errorStore) {
  const cantBeNull = ['email', 'password']
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!login[v]  === null || login[v] === undefined || login[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 

  if (login && login.email) {
    const validEmail = validator.isEmail(login.email)
    if (!validEmail) { errors['email'] = 'Please enter a valid email' }
  }

  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}