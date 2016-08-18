import moment from 'moment';
import _ from 'lodash';

export function validateJobFormHelper (errorStore, state, set) {
  const cantBeNull = ['company', 'title']
  const { job } = state;
  var error = errorStore;
  
  _.forEach(error, (v, k) => {
    if (cantBeNull.includes(k)) {
      if (!job[k] || job[k] === '') {
        error[k] = 'Please add a ' + k + '.';
      } 
    } else if (['startDate', 'endDate'].includes(k)) {
      if (job.startDate === '' || job.startDate === '') {
        error['date'] = 'Please enter dates of employment.';
      }
      const start = moment(new Date(job.startDate));
      const end   = moment(new Date(job.endDate));
      if (end.isBefore(start)) {
        error['date'] = "The end date can't be before the start date.";
      }
      if (start.isAfter(moment()) || end.isAfter(moment())) {
        error['date'] = "Dates must be before today. If this is your current job, please select the current box.";
      }

    }
  }) 
  return { 
    error, 

  }
}

export function containsErrors (errorStore) {
  return _.reject(errorStore, (k, v) => {
    return k === '';
  }).length > 0
}