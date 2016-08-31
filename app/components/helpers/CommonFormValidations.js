import moment from 'moment';
import _ from 'lodash';

export function containsErrors (errorStore) {
  return _.reject(errorStore, (k, v) => {
    return k === '' || k === false || k === true;
  }).length > 0
}

export function setValidationErrorObject(target) {
  const clone = {};
  _.forEach(_.cloneDeep(target), (v, k) => { clone[k] = '';} )
  return clone
}