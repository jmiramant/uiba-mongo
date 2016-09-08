import { polyfill } from 'es6-promise';
//import request from 'axios';
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import * as types from 'types';

polyfill();

export function profileChange(state) {
  return {
    type: types.CHANGE_PROFILE,
    state
  };
}

function makeProfileRequest(method, data, api = '/profile') {
  //return request[method](api, data);
  return fetch(api, {method}).then(r => r.json()).catch(e => console.error(e.stack));
}

export function updateProfileRequest(data) {
  return {
    type: types.UPDATE_PROFILE,
    data: data
  }
}

export function updateProfileSuccess(data) {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    data: data
  }
}

export function updateProfileFailure(data) {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    error: data.error
  }
}

export function toggleProfileEdit (data) {
  return {
    type: types.TOGGLE_PROFILE_EDIT,
    data: data
  };
}


export function updateProfile(profileData) {
  return (dispatch) => {

    dispatch(updateProfileRequest(profileData));
    
    return makeProfileRequest('put', profileData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateProfileSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(updateProfileFailure({ error: 'Oops! Something went wrong and we couldn\'t create your profile.'}));
      });
  }

}

export function fetchProfile() {
  return {
    type: types.GET_PROFILE,
    promise: makeProfileRequest('get', {}, 'profile/me')
  };
}
