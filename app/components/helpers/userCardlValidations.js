import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateUserCardHelper (profile, errorStore) {
  const cantBeNull = ['name', 'headline']
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!profile[v] || profile[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 

  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}