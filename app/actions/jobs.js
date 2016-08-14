import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

function makeJobsRequest(method, data, api = '/jobs/me') {
  return request[method](api, data);
}

export function fetchJobs() {
  return {
    type: types.GET_JOBS,
    promise: makeJobsRequest('get')
  };
}

export function createJobRequest(data) {
  return {
    type: types.CREATE_JOB,
    data: data
  };
}

export function createJobSuccess(data) {
  return {
    type: types.CREATE_JOB_SUCCESS,
    data: data
  };
}

export function createTopicFailure(data) {
  return {
    type: types.CREATE_JOB_FAILURE,
    error: data.error
  };
}

export function updateJobRequest(data) {
  return {
    type: types.UPDATE_JOB,
    data: data
  }
}

export function updateJobSuccess(data) {
  return {
    type: types.UPDATE_JOB_SUCCESS,
    data: data
  }
}

export function createJob(jobData) {
  let dispatch = this;

  return () => {
    dispatch(createJobRequest(jobData));
    
    return makeJobsRequest('post', jobData, '/jobs')
      .then(res => {
        if (res.status === 200) {
          return dispatch(createJobSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(createTopicFailure({ error: 'Oops! Something went wrong and we couldn\'t create your job.'}));
      });
  }
}

export function updateJob(jobData) {
  let dispatch = this;
  return () => {

    dispatch(updateJobRequest(jobData));
    
    return makeJobsRequest('put', jobData, '/jobs')
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateJobSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(createTopicFailure({ error: 'Oops! Something went wrong and we couldn\'t create your job.'}));
      });
  }

}

