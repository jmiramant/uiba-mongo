import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';
import validator from 'validator';

export function validateSignupHelper (signup, errorStore) {
  const cantBeNull = ['first', 'last', 'email', 'password', 'confirm']
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!signup[v]  === null || signup[v] === undefined || signup[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 

  if (signup && signup.email) {
    const validEmail = validator.isEmail(signup.email)
    if (!validEmail) { errors['email'] = 'Please enter a valid email' }
  }

  if (signup && signup.password && signup.confirm) {
    if (signup.password !== signup.confirm) { 
      errors['confirm'] = 'Your passwords does not match.' 
    }
    if (signup.password.length < 6) {
      errors['password'] = 'Your passwords must be at least 6 characters long.' 
    }
  }


  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}