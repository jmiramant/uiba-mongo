import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_JOBS_REQUEST:
      return true;
    case types.GET_JOBS_SUCCESS:
    case types.GET_JOBS_FAILURE:
      return false;
    default:
      return state;
  }
};

const jobOrder = (jobs, order = 'asc') => {
  if (order === 'asc') {
    return jobs.sort( (a,b) => {
      if (a.current || b.current) {
        if (a.current && !b.current) {
          return -1;
        } else {
          return 1;
        }
      }
      else if (new Date(a.endDate) > new Date(b.endDate)) { 
        return -1; 
      } else {
        return 1; 
      }
    });    
  } else {
    return jobs.sort( (a,b) => {
      if (new Date(a.endDate) < new Date(b.endDate)) { 
        return -1; 
      } else {
        return 1; 
      }
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
        company_id: '',
        profile_id: '',
        companyName: '',
        title: '',
        headline: '',
        description: '',
        startDate: '',
        endDate: '',
        current: '',
      };
    case types.CHANGE_JOB:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.CREATE_JOB_SUCCESS:
      return {
        companyName: '',
        title: '',
        headline: '',
        description: '',
        startDate: '',
        endDate: '',
        current: '',
      };
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
  isFetching,
  job,
  jobs,
  addShow,
});

export default jobReducer;
