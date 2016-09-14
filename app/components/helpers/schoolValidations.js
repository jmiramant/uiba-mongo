import { setValidationErrorObject,
         containsErrors,
       } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateSchoolHelper (school, errorStore) {
  const cantBeNull = ['name', 'major', 'startDate', 'degree']
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!school[v] || school[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 

  if (!school.endDate && !school.current) {
    errors['endDate'] = "Please add end date or select current job."
  }

  if (school.startDate && school.endDate) {
    const start = moment(new Date(school.startDate));
    const end   = moment(new Date(school.endDate));

    if (end.isBefore(start) && !school.current) {
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