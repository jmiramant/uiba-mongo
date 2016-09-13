import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateSkillHelper (skill, errorStore) {
  const cantBeNull = ['type', 'lengthOfUse', 'proficiency']
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (skill[v] === null || skill[v] === undefined || skill[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 
  
  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}