import * as types from 'types';
import { combineReducers } from 'redux';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_PROFILE_REQUEST:
      return true;
    case types.GET_PROFILE_SUCCESS:
    case types.GET_PROFILE_FAILURE:
      return false;
    default:
      return state;
  }
};

const currentProfile = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS:
      return action.res.data;
    case types.GET_PROFILE_FAILURE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const profileReducer = combineReducers({
  isFetching,
  currentProfile,
});

export default profileReducer;
