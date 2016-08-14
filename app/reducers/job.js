import * as types from 'types';
import { combineReducers } from 'redux';

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

const jobs = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_JOBS_SUCCESS:
      return jobOrder(action.res.data)
    case types.CREATE_JOB_SUCCESS:
      const newJobs = state.concat(action.data);
      return jobOrder(newJobs)
    case types.CREATE_JOB_REQUEST:
      return {
        data: action.res.data,
      };
    default:
      return state;
  }
};

const jobReducer = combineReducers({
  jobs,
});

export default jobReducer;
