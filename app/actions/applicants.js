import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

function makeApplicantRequest(method, data, api = '/applicant') {
  return request[method](api, data);
}

// export function fetchApplicant(id) {
//   return {
//     type: types.GET_APPLICANTS,
//     promise: makeApplicantRequest('get', {}, '/applicants/' + id)
//   }
// }

export function fetchApplicants(id) {
  return {
    type: types.GET_APPLICANTS,
    promise: makeApplicantRequest('get', {}, '/applicants/' + id)
  }
}

export function fetchApplicant(profId) {
  let path = '/profile';
  if (profId) {
    path = '/profile/' + profId;
  }
  
  return {
    type: types.GET_APPLICANT,
    promise: makeApplicantRequest('get', {}, path)
  }
}