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
    case types.CREATE_ADDRESS_SUCCESS:
    case types.UPDATE_ADDRESS_SUCCESS:
    case types.UPDATE_ADDRESS_FAILURE:
      return state;      
    default:
      return state;
  }
};

const error = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.UPDATE_ADDRESS_AUTOFILL_SUCCESS:
    case types.CREATE_ADDRESS_SUCCESS:    
      return state;
    case types.UPDATE_ADDRESS_FAILURE:
      return action.error;
    default:
      return state;
  }
};

const editIcon = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.SHOW_ADDRESS_EDIT_ICON:
      return true;
    case types.HIDE_ADDRESS_EDIT_ICON:
      return false;
    default:
      return state;
  }
}

const edit = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_ADDRESS_EDIT:
      return !action.data
    case types.CREATE_ADDRESS_SUCCESS:
    case types.UPDATE_ADDRESS_SUCCESS:
      return false;
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

const zip = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.SET_ZIP:
      return action.data;
    case types.CLEAR_RANGE_ADDRESS:
      return {};
    default:
      return state;
  }
};

const range = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.SET_RANGE:
      return action.data;
    case types.CLEAR_RANGE_ADDRESS:
      return '';
    default:
      return state;
  }
};

const rangeZips = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.UPDATE_RANGE_AUTOFILL_SUCCESS:
      return action.results.data.zip_codes;
    case types.CLEAR_RANGE_ADDRESS:
      return [];
    default:
      return state;
  }
}

const addressReducer = combineReducers({
  isFetching,
  address,
  autofill,
  edit,
  editIcon,
  error,
  range,
  rangeZips,
  zip
});

export default addressReducer;
