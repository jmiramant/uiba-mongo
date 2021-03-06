import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import moment from 'moment';
import isURL from 'validator/lib/isURL';
import _ from 'lodash';



export function validateProjectHelper (project, errorStore) {
  const cantBeNull = ['name', 'description', 'startDate']
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!project[v] || project[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 

  if (!project.endDate && !project.current) {
    errors['endDate'] = "Please add end date or select current project."
  }

  if (project.startDate && project.endDate) {
    const start = moment(new Date(project.startDate));
    const end   = moment(new Date(project.endDate));

    if (end.isBefore(start) && !project.current) {
      errors['endDate'] = "The end date can't be before the start date.";
    }
    if (start.isAfter(moment()) || end.isAfter(moment())) {
      errors['endDate'] = "Dates must be before today. If this is your current school, please select the current box.";
    }
  }

  if (project.projectUrl) {
    if (!isURL(project.projectUrl, { protocols: ['http','https'] })) {
      errors['projectUrl'] = "Please add a valid link.";
    }
  }
  
  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}