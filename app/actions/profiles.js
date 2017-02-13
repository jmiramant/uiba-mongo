/* eslint-disable object-shorthand */
/* eslint-disable import/no-extraneous-dependencies */
import { polyfill } from 'es6-promise';
import request from 'axios';
import { ProfileTypes } from 'types';

polyfill();

export function profileChange(state) {
  return {
    type: ProfileTypes.CHANGE_PROFILE,
    state
  };
}

function makeProfileRequest(method, data, api = '/profile') {
  return request[method](api, data);
}

export function updateProfileRequest(data) {
  return {
    type: ProfileTypes.UPDATE_PROFILE,
    data: data
  };
}

export function updateProfileSuccess(data) {
  return {
    type: ProfileTypes.UPDATE_PROFILE_SUCCESS,
    data: data
  };
}

export function updateProfileFailure(data) {
  return {
    type: ProfileTypes.UPDATE_PROFILE_SUCCESS,
    error: data.error
  };
}

export function toggleProfileEdit(data) {
  return {
    type: ProfileTypes.TOGGLE_PROFILE_EDIT,
    data: data
  };
}


export function updateProfile(profileData) {
  return (dispatch) => {
    dispatch(updateProfileRequest(profileData));

    return makeProfileRequest('put', profileData)
      .then(res => {
        return dispatch(updateProfileSuccess(res.data));
      })
      .catch(() => {
        return dispatch(updateProfileFailure({ error: 'Oops! Something went wrong and we couldn\'t create your profile.'}));
      });
  };
}

export function fetchProfile(profId) {
  let path = '/profile/me';
  if (profId) path = '/profile/' + profId;
  return {
    type: ProfileTypes.GET_PROFILE,
    promise: makeProfileRequest('get', {}, path)
  };
}
