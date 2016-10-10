import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const company = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.GET_COMPANY_SUCCESS:
      return action.data;
    case types.GET_COMPANY_FAILURE:
      return state;
    default:
      return state;
  }
};

const companyReducer = combineReducers({
  company,
});

export default companyReducer;
