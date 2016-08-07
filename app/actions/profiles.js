import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from 'types';

polyfill();

function makeUserRequest(method, data, api = '/profile/me') {
  return request[method](api, data);
}

export function fetchCurrentProfile() {
  return {
    type: types.GET_CURRENT_PROFILE,
    promise: makeUserRequest('get')
  };
}