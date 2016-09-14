import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateJobHelper (job, errorStore) {
  const cantBeNull = ['companyName', 'startDate', 'description', 'title']
  var errors = setValidationErrorObject(errorStore);

  _.forEach(cantBeNull, (v, i) => {
    if (!job[v] || job[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 

  if (!job.endDate && !job.current) {
    errors['endDate'] = "Please add end date or select current job."
  }

  if (job.startDate && job.endDate) {
    const start = moment(new Date(job.startDate));
    const end   = moment(new Date(job.endDate));

    if (end.isBefore(start) && !job.current) {
      errors['endDate'] = "The end date can't be before the start date.";
    }
    if (start.isAfter(moment()) || end.isAfter(moment())) {
      errors['endDate'] = "Dates must be before today. If this is your current school, please select the current box.";
    }
  }
  
  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}