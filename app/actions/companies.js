import request from 'axios';
import { polyfill } from 'es6-promise';

import * as types from 'types';

function makeCompaniesRequest(method, data, api = '/companies') {
  return request[method](api, data);
}

export function fetchCompanyRequest(companyName) {
  return {
    type: types.GET_COMPANY,
    promise: makeCompaniesRequest('get', {}, '/companies/' + companyName)
  };
}

export function fetchCompanySuccess(data) {
  return {
    type: types.GET_COMPANY_SUCCESS,
    data: data
  };
}


export function fetchCompanyFailure(data) {
  return {
    type: types.GET_COMPANY_FAILURE,
    data: data.error
  };
}

export function fetchCompany(companyName) {
  return (dispatch) => {

    return makeCompaniesRequest('get', {}, '/companies/' + companyName)
      .then(res => {
        if (res.status === 200) {
          return dispatch(fetchCompanySuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(fetchCompanyFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your school.'}));
      });
  }

}