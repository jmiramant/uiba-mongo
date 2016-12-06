import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateSubmitHelper (props, errorStore) {
  var errors = setValidationErrorObject(errorStore);

  const setPosition = (val) => {
    (!errors.position || val < errors.position) ? errors.position = val : null
  }
  
  if (props.interests.interests.length < 3) {
    errors.interests = 'Please include at least 3 interests.';
    errors.position = 'interest';
  }

  if (props.schools.schools.length < 1) {
    errors.schools = 'Please complete your education history.';
    errors.position = 'school';
  }

  if (props.skills.skills.length < 8) {
    errors.skills = 'Please include at least 8 KSAs.';
    errors.position = 'skill';
  }
  
  if (props.jobs.jobs.length < 1) {
    errors.jobs = 'Please complete your employment history.';
    errors.position = 'job';
  }
  
  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}