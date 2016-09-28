import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

export function toggleResend() {
  return {
    type: types.TOGGLE_RESEND,
  };
}

export function confirmEmailChange(state) {
  return {
    type: types.CHANGE_CONFIRM_EMAIL,
    state
  };
}

export function resendSuccess(state) {
  return {
    type: types.RESEND_CONFIRM_SUCCESS,
    state
  };
}

export function resendFailure(data) {
  return {
    type: types.RESEND_CONFIRM_FAILURE,
    error: data.error
  };
}

export function resend(data) {
  return (dispatch) => {
    return request['post']('/resendValidationEmail', {email: data})
      .then(res => {
        if (res.status === 200) {
          return dispatch(resendSuccess(res.data));
        }
      })
      .catch((err) => {
        let error = err
        if (err.response && err.response.data) { error = err.response.data }
        return dispatch(resendFailure({error: error}));
      });
  }
}

