import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateRoleHelper (role, skills, errorStore) {
  const cantBeNull = ['title', 'description'];
  var errors = setValidationErrorObject(errorStore);

  _.forEach(cantBeNull, (v, i) => {
    if (!role[v] || role[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    }
  });

  if (skills.length < 3) {
    errors['skills'] = 'Please include at least 3 skills.';
  }

  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}