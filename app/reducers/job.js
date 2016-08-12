import * as types from 'types';
import { combineReducers } from 'redux';

const currentJobs = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_CURRENT_JOBS_SUCCESS:
      return action.res.data;
    default:
      return state;
  }
};

const jobReducer = combineReducers({
  currentJobs,
});

export default jobReducer;
