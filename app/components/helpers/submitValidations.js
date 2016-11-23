import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateSubmitHelper (props, errorStore) {
  var errors = setValidationErrorObject(errorStore);

  if (props.skills.skills.length < 8) {
    errors.skills = 'At least 8 skills are required.'
  }

  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}