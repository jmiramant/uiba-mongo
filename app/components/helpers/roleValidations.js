import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateJobHelper (job, errorStore) {
  const cantBeNull = ['title', 'description'];
  var errors = setValidationErrorObject(errorStore);

  _.forEach(cantBeNull, (v, i) => {
    if (!job[v] || job[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    }
  });

  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}