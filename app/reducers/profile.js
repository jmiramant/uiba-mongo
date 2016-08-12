import * as types from 'types';
import { combineReducers } from 'redux';

const currentProfile = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_CURRENT_PROFILE_SUCCESS:
      return action.res.data;
    case types.GET_CURRENT_PROFILE_FAILURE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const profileReducer = combineReducers({
  currentProfile,
});

export default profileReducer;
