import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const jobOrder = (jobs, order = 'asc') => {
  if (order === 'asc') {
    return jobs.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  } else {
    return jobs.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  }
}

const job = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_NEW_JOB:
      return {
        profile_id: undefined,
        name: undefined,
        major: undefined,
        minor: undefined,
        degree: undefined,
        startDate: undefined,
        endDate: undefined,
        current: undefined
      }
    case types.CHANGE_JOB:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    default:
      return state;
  }
};

const jobs = (
  state = [],
  action
) => {
  let updatedJob;
  switch (action.type) {
    case types.GET_JOBS_SUCCESS:
      return jobOrder(action.res.data)
    case types.CREATE_JOB_SUCCESS:
      const newJobs = state.concat(action.data);
      return jobOrder(newJobs)
    case types.CHANGE_JOBS:
      updatedJob = [...state]
      updatedJob[_.findIndex(updatedJob, {_id: action.state.id})][action.state.field] = updatedJob[_.findIndex(updatedJob, {_id: action.state.id})][action.state.field] = action.state.value
      return jobOrder(updatedJob)
    case types.UPDATE_JOB_SUCCESS:
      updatedJob = state.slice()
      updatedJob[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return jobOrder(updatedJob)
    case types.DELETE_JOB_SUCCESS:
      const newState = state.slice();
      return newState.filter( j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_JOB_REQUEST:
      return {
        data: action.res.data,
      };
    default:
      return state;
  }
};


const addShow = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_JOB_ADD:
      return !action.data
    default:
      return state;
  }
};

const jobReducer = combineReducers({
  job,
  jobs,
  addShow,
});

export default jobReducer;
