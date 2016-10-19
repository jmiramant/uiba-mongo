import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_ADDRESS_REQUEST:
      return true;
    case types.GET_ADDRESS_SUCCESS:
    case types.GET_ADDRESS_FAILURE:
      return false;
    default:
      return state;
  }
};

const autofill = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.UPDATE_ADDRESS_AUTOFILL_SUCCESS:
      return action.results.data;
    default:
      return state;
  }
};

const address = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.GET_ADDRESS_SUCCESS:
      return action.res.data;
    case types.CREATE_ADDRESS_SUCCESS:
      return action.data;
    case types.GET_ADDRESS_FAILURE:
      return state;
    case types.UPDATE_ADDRESS_SUCCESS:
      return {...state}
    default:
      return state;
  }
};

const addressReducer = combineReducers({
  isFetching,
  address,
  autofill
});

export default addressReducer;
