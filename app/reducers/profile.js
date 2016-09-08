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
      console.log('===========================')
      console.log('success ')
      console.log('===========================')
      return false;
    case types.GET_PROFILE_FAILURE:
      console.log('===========================<')
      console.log('fail')
      console.log('===========================<')
      return false;
    default:
      return state;
  }
};

const profile = (
  state = [],
  action
) => {
  let updatedProfile;
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS:
      return action.res.data;
    case types.CHANGE_PROFILE:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.GET_PROFILE_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.UPDATE_PROFILE_SUCCESS:
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
    case types.TOGGLE_PROFILE_EDIT:
    case types.UPDATE_PROFILE_SUCCESS:
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
