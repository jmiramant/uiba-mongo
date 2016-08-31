import moment from 'moment';
import _ from 'lodash';

export function validateSchoolFormHelper (errorStore, state) {
  const cantBeNull = ['name', 'major', 'startDate', 'degree']
  const { school } = state;
  var error = JSON.parse(JSON.stringify(errorStore));
  
  _.forEach(error, (v, k) => {
    if (cantBeNull.includes(k)) {
      if (!school[k] || school[k] === '' || school[k][0] === '') {
        error[k] = 'Please add a ' + k + '.';
      } 
    } else if (['startDate', 'endDate'].includes(k)) {
      const start = moment(new Date(school.startDate));
      const end   = moment(new Date(school.endDate));
      if (end.isBefore(start)) {
        error['date'] = "The end date can't be before the start date.";
      }
      if (start.isAfter(moment()) || end.isAfter(moment())) {
        error['date'] = "Dates must be before today. If this is your current school, please select the current box.";
      }

    } 

  }) 
  return { 
    error
  }
}