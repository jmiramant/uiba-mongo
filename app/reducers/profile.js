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
    case types.GET_CURRENT_PROFILE_SUCCESS:
      return action.res.data;
    default:
      return state;
  }
};

const profileReducer = combineReducers({
  currentProfile,
});

export default profileReducer;
