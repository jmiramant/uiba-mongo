import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const company = (
  state = {},
  action
) => {
  switch (action.type) {
  case types.CREATE_NEW_COMPANY:
      return {
        company_id: '',
        profile_id: '',
        companyName: '',
        title: '',
        headline: '',
        description: '',
        startDate: '',
        endDate: '',
        current: '',
      };
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
    default:
      return state;
  }
};

const companyReducer = combineReducers({
  company,
  addShow
});

export default companyReducer;
