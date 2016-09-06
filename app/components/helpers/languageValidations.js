import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateLanguageHelper (language, errorStore) {
  const cantBeNull = ['language', 'proficiency']
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!language[v] || language[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 
  
  if (language.proficiency !== 'native or bilingual proficiency' && 
     (!language.experience || language.experience === '')) {
    errors.experience = 'Please add your experience level.';
  } 

  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}