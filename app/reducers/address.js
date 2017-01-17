import { AddressTypes } from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case AddressTypes.GET_ADDRESS_REQUEST:
      return true;
    case AddressTypes.GET_ADDRESS_SUCCESS:
    case AddressTypes.GET_ADDRESS_FAILURE:
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
    case AddressTypes.UPDATE_ADDRESS_AUTOFILL_SUCCESS:
      return action.results.data;
    case AddressTypes.CREATE_ADDRESS_SUCCESS:
      return {};      
    default:
      return state;
  }
};

const error = (
  state = '',
  action
) => {
  switch (action.type) {
    case AddressTypes.UPDATE_ADDRESS_AUTOFILL_SUCCESS:
    case AddressTypes.CREATE_ADDRESS_SUCCESS:
      return '';
    case AddressTypes.CREATE_ADDRESS_ERROR_MSG:
    case AddressTypes.UPDATE_ADDRESS_FAILURE:
    case AddressTypes.CREATE_ADDRESS_FAILURE:
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
    case AddressTypes.SHOW_ADDRESS_EDIT_ICON:
      return true;
    case AddressTypes.HIDE_ADDRESS_EDIT_ICON:
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
    case AddressTypes.TOGGLE_ADDRESS_EDIT:
      return !action.data
    case AddressTypes.CREATE_ADDRESS_SUCCESS:
    case AddressTypes.UPDATE_ADDRESS_SUCCESS:
      return false;
    default:
      return state;
  }
};


const address = (
  state = [],
  action
) => {
  switch (action.type) {
    case AddressTypes.GET_ADDRESS_SUCCESS:
      return action.res.data;
    case AddressTypes.CREATE_ADDRESS_SUCCESS:
      return [...state, action.data.data];
    case AddressTypes.GET_ADDRESS_FAILURE:
      return [];
    case AddressTypes.DELETE_ADDRESS_SUCCESS:
      return _.filter(state, (a) => { return a._id !== action.data.id })
    case AddressTypes.UPDATE_ADDRESS_SUCCESS:
      return [...state]
    default:
      return state;
  }
};

const zip = (
  state = '',
  action
) => {
  switch (action.type) {
    case AddressTypes.SET_ZIP:
      return action.data;
    case AddressTypes.CLEAR_RANGE_ADDRESS:
      return '';
    default:
      return state;
  }
};

const range = (
  state = '',
  action
) => {
  switch (action.type) {
    case AddressTypes.SET_RANGE:
      return action.data;
    case AddressTypes.CLEAR_RANGE_ADDRESS:
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
    case AddressTypes.UPDATE_RANGE_AUTOFILL_SUCCESS:
      return action.results.data.zip_codes;
    case AddressTypes.CLEAR_RANGE_ADDRESS:
      return [];
    default:
      return state;
  }
}

const addressReducer = combineReducers({
  isFetching,
  address,
  autofill,
  error,
  editIcon, 
  edit,
  range,
  rangeZips,
  zip
});

export default addressReducer;
