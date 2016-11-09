import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const company = (
  state = {
    name: "",
    address_id: "",
    description: "",
    foundedDate: "",
    size: "",
    websiteUrl: "",
    logoUrl: "",
    specialties: "",
    industry: ""
  },
  action
) => {
  switch (action.type) {
    case types.CREATE_NEW_COMPANY:
      return state;
    case types.CHANGE_COMPANY:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.CREATE_COMPANY_SUCCESS:
      return action.data;
    case types.SET_COMPANY_FROM_TYPEAHEAD:
      return action.company;
    case types.GET_COMPANY_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

const isExistingData = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.CHANGE_COMPANY:
      return false;
    case types.SET_COMPANY_FROM_TYPEAHEAD:
      return true;
    default:
      return state;
  }
}

const typeahead = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.UPDATE_COMPANY_TYPEAHEAD_SUCCESS: 
      return action.results;
    default:
      return state;
  }
};

const selection = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.SET_INITIAL_COMPANY_SELECTION:
      return (action.selection ? action.selection : '')
    case types.UPDATE_COMPANY_SELECTION:
      return action.selection
    default:
      return state;
  } 
};

const addShow = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_COMPANY_ADD:
      return !action.data
    case types.GET_COMPANY_SUCCESS:
    case types.GET_COMPANY_FAILURE:
      let resp = false;
      if (!action.data) resp = true
      return resp
    default:
      return state;
  }
};

const companyReducer = combineReducers({
  company,
  addShow,
  typeahead,
  selection,
  isExistingData
});

export default companyReducer;
