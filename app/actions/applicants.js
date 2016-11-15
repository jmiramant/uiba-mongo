import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

function makeApplicantRequest(method, data, api = '/applicant') {
  return request[method](api, data);
}

export function fetchApplicants(id) {
  return {
    type: types.GET_APPLICANTS,
    promise: makeApplicantRequest('get', {}, '/applicants/' + id)
  };
}