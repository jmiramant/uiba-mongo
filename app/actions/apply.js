import request from 'axios';
import { polyfill } from 'es6-promise';
import { push } from 'react-router-redux'

import * as types from 'types';

function makeApplyRequest(method, data, api) {
  return request[method](api, data);
}

export function toggleApplyState () {
  return {
    type: types.TOGGLE_APPLY,
  };
}

export function submitApplySuccess(data) {
  return {
    type: types.APPLY_SUCCESS,
    data: data
  };
}

export function submitApplyFailure(data) {
  return {
    type: types.APPLY_FAILURE,
    error: data.error
  };
}

export function navBackToProfile(data) {
  return (dispatch) => {
    dispatch(push('/profile'))
  };
}


export function sumbitApplication(profile) {
  return (dispatch) => {
    profile.apply.applied = false;
    return makeApplyRequest('put', profile, '/profile')
      .then(res => {
        if (res.status === 200) {
          dispatch(push('/apply-confirmation'))
          return dispatch(submitApplySuccess(res.data));
        }
      })
      .catch((err) => {
        console.log(err)
        return dispatch(submitApplyFailure({ error: err}));
      });
  }

}