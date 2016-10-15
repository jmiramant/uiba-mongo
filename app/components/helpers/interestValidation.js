import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateInterestHelper (interest, errorStore) {
  const cantBeNull = ['interest']
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!interest[v]  === null || interest[v] === undefined || interest[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 

  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}