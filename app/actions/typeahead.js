import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from 'types';

polyfill();

export function updateTypeahead(results) {
  return {
    type: types.UPDATE_RESULTS_SUCCESS,
    results
  };
}

export function setTypeaheadData(selection) {
  return {
    type: types.UPDATE_SELECTION,
    selection
  };
}

export function makeTypeaheadRequest(method, data, api = '/schoolnames') {
  return request[method](api, data);
}


export function fetchTypeaheadData(searchTerm) {
  const apiUrl = "/schoolnames/search" + "?search=" + searchTerm
  
  return dispatch => {

    makeTypeaheadRequest('get', null,  apiUrl)
      .then(response => {
        dispatch(updateTypeahead(response.data))
      });
  }
}
