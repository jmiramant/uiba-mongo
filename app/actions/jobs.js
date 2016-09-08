import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

export function newJob() {
  return {
    type: types.NEW_JOB,
  };
}

export function jobChange(state) {
  return {
    type: types.CHANGE_JOBS,
    state
  };
}

export function jobsChange(state) {
  return {
    type: types.CHANGE_JOBS,
    state
  };
}

export function toggleJobAdd (data) {
  return {
    type: types.TOGGLE_JOB_ADD,
    data: data
  };
}

function makeJobsRequest(method, data, api = '/jobs') {
  console.log('-----axios---')
  console.log(method, api, data)
  console.log('-----axios---')
  return request[method](api, data);
}

export function fetchJobs() {
  return {
    type: types.GET_JOBS,
    promise: makeJobsRequest('get', {}, 'jobs/me')
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

export function createJobFailure(data) {
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

export function updateJobFailure(data) {
  return {
    type: types.UPDATE_JOB_FAILURE,
    error: data.error
  };
}

export function createJob(jobData) {
  return (dispatch) => {
    dispatch(createJobRequest(jobData));
    
    return makeJobsRequest('post', jobData, '/jobs')
      .then(res => {
        if (res.status === 200) {
          return dispatch(createJobSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(createJobFailure({ error: 'Oops! Something went wrong and we couldn\'t create your job.'}));
      });
  }
}

export function updateJob(jobData) {
  return (dispatch) => {

    dispatch(updateJobRequest(jobData));
    
    return makeJobsRequest('put', jobData, '/jobs')
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateJobSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(updateJobFailure({ error: 'Oops! Something went wrong and we couldn\'t create your job.'}));
      });
  }

}

export function deleteJobRequest (data) {
  return {
    type: types.DELETE_JOB_REQUEST,
    data: data
  }
}

export function deleteJobSuccess (data) {
  return {
    type: types.DELETE_JOB_SUCCESS,
    data: data
  }
}

export function deleteJobFailure (data) {
  return {
    type: types.DELETE_JOB_FAILURE,
    error: data.error
  }
}

export function deleteJob(job) {
  return (dispatch) => {

    dispatch(deleteJobRequest(job));

    return makeJobsRequest('delete', job, '/jobs/' + job._id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteJobSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(deleteJobFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your job.'}));
      });
  }

}
