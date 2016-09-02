import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import _ from 'lodash';

export function validateLanguageHelper (language, errorStore) {
  const cantBeNull = ['name', 'major', 'startDate', 'degree']
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!language[v] || language[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 

  if (!language.endDate && !language.current) {
    errors['endDate'] = "Please add end date or select current job."
  }

  if (language.startDate && language.endDate) {
    const start = moment(new Date(language.startDate));
    const end   = moment(new Date(language.endDate));
    if (end.isBefore(start)) {
      errors['date'] = "The end date can't be before the start date.";
    }
    if (start.isAfter(moment()) || end.isAfter(moment())) {
      errors['date'] = "Dates must be before today. If this is your current language, please select the current box.";
    }
  }
  
  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}