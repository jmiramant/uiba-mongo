import { polyfill } from 'es6-promise';
import request from 'axios';
import { TypeaheadTypes } from 'types';

polyfill();

export function updateTypeahead(results) {
  return {
    type: TypeaheadTypes.UPDATE_RESULTS_SUCCESS,
    results
  };
}

export function setTypeaheadData(selection) {
  return {
    type: TypeaheadTypes.UPDATE_SELECTION,
    selection
  };
}


export function setInitialTypeaheadData(selection) {
  return {
    type: TypeaheadTypes.SET_INITIAL_SELECTION,
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