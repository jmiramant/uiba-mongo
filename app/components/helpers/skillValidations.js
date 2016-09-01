import { setValidationErrorObject } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateSkillHelper (obj, state) {
  const cantBeNull = ['type', 'frequency', 'lengthOfUse', 'proficiency']
  const { skill } = state;
  var error = setValidationErrorObject(obj);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!obj[v] || obj[v] === '') {
      error[v] = 'Please add a ' + v + '.';
    } 
  }) 
  return { 
    error
  }
}