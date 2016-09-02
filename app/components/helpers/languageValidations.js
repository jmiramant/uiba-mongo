import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateLanguageHelper (language, errorStore) {
  const cantBeNull = ['language', 'proficiency', 'experience']
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!language[v] || language[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 

  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}