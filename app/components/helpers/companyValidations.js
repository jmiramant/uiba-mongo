import { setValidationErrorObject,
         containsErrors } from './CommonFormValidations';
import isURL from 'validator/lib/isURL';
import _ from 'lodash';

export function validateCompanyHelper (company, errorStore) {
  const cantBeNull = ['name', 'description', 'foundedDate', 'size', 'websiteUrl', 'logoUrl', 'specialties', 'industry'];
  var errors = setValidationErrorObject(errorStore);
  
  _.forEach(cantBeNull, (v, i) => {
    if (!company[v]  === null || company[v] === undefined || company[v] === '') {
      errors[v] = 'Please add a ' + v + '.';
    } 
  }) 

  if (company.websiteUrl) {
    if (!isURL(company.websiteUrl, { protocols: ['http','https'] })) {
      errors['websiteUrl'] = "Please add a valid link.";
    }
  }
  
  return {
    errors,
    containsErrors: containsErrors(errors)
  }
}
