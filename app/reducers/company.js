import { CompanyTypes } from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case CompanyTypes.GET_COMPANY_REQUEST:
      return true;
    case CompanyTypes.GET_COMPANY_SUCCESS:
    case CompanyTypes.GET_COMPANY_FAILURE:
      return false;
    default:
      return state;
  }
};

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
    case CompanyTypes.CREATE_NEW_COMPANY:
      return state;
    case CompanyTypes.CHANGE_COMPANY:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case CompanyTypes.CREATE_COMPANY_SUCCESS:
      return action.data;
    case CompanyTypes.SET_COMPANY_FROM_TYPEAHEAD:
      return action.company;
    case CompanyTypes.GET_COMPANY_SUCCESS:
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
    case CompanyTypes.CHANGE_COMPANY:
      return false;
    case CompanyTypes.SET_COMPANY_FROM_TYPEAHEAD:
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
    case CompanyTypes.UPDATE_COMPANY_TYPEAHEAD_SUCCESS: 
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
    case CompanyTypes.SET_INITIAL_COMPANY_SELECTION:
      return (action.selection ? action.selection : '')
    case CompanyTypes.UPDATE_COMPANY_SELECTION:
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
    case CompanyTypes.TOGGLE_COMPANY_ADD:
      return !action.data
    case CompanyTypes.GET_COMPANY_SUCCESS:
    case CompanyTypes.GET_COMPANY_FAILURE:
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
  isFetching,
  isExistingData
});

export default companyReducer;
