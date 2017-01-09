import { ProfileTypes } from 'types';
import { combineReducers } from 'redux';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case ProfileTypes.GET_PROFILE_REQUEST:
      return true;
    case ProfileTypes.GET_PROFILE_SUCCESS:
    case ProfileTypes.GET_PROFILE_FAILURE:
      return false;
    default:
      return state;
  }
};

const profile = (
  state = {},
  action
) => {
  let updatedProfile;
  switch (action.type) {
    case ProfileTypes.GET_PROFILE_SUCCESS:
      return action.res.data;
    case ProfileTypes.CHANGE_PROFILE:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case ProfileTypes.GET_PROFILE_FAILURE:
      return state;
    case ProfileTypes.UPDATE_PROFILE_SUCCESS:
      return {...state}
    default:
      return state;
  }
};

const edit = (
  state = false,
  action
) => {
  switch (action.type) {
    case ProfileTypes.TOGGLE_PROFILE_EDIT:
    case ProfileTypes.UPDATE_PROFILE_SUCCESS:
      return !action.data
    default:
      return state;
  }
};

const profileReducer = combineReducers({
  isFetching,
  profile,
  edit
});

export default profileReducer;
