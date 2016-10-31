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
      return {};
    case types.GET_COMPANY_SUCCESS:
      return action.data;
    case types.GET_COMPANY_FAILURE:
      return state;
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
  addShow
});

export default companyReducer;
