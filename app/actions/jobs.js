import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

function makeJobsRequest(method, data, api = '/jobs/me') {
  return request[method](api, data);
}

export function fetchCurrentJobs() {
  return {
    type: types.GET_CURRENT_JOBS,
    promise: makeJobsRequest('get')
  };
}

export function saveNewJob(jobData) {
  return {
    type: types.SAVE_JOB,
    promise: makeJobsRequest('post', jobData, '/jobs')
  }
}