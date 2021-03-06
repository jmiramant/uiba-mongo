import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateSubmitHelper (props, errorStore) {
  var errors = setValidationErrorObject(errorStore);

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

  if (!props.profile.profile.firstName.length === 0 || !props.profile.profile.lastName.length === 0) {
    errors.name = 'Please update your name.';
    errors.position = 'userCard';
  }

  if (!props.address.address || !props.address.address.length > 0) {
    errors.address = 'Please enter a zip code.';
    errors.position = 'userCard';
  }
  
  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}