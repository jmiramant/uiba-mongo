import request from 'axios';
import { polyfill } from 'es6-promise';
import { push } from 'react-router-redux'

import { ApplyTypes } from 'types';

function makeApplyRequest(method, data, api) {
  return request[method](api, data);
}

export function toggleApplyState () {
  return {
    type: ApplyTypes.TOGGLE_APPLY,
  };
}

export function submitApplySuccess(data) {
  return {
    type: ApplyTypes.APPLY_SUCCESS,
    data: data
  };
}

export function submitApplyFailure(data) {
  return {
    type: ApplyTypes.APPLY_FAILURE,
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
    const prof = {...profile, apply: {...profile.apply, applied:false, applyComplete: true}};
    return makeApplyRequest('put', prof, '/profile')
      .then(res => {
        if (res.status === 200) {
          dispatch(push('/applyConfirmation'))
          return dispatch(submitApplySuccess(res.data));
        }
      })
      .catch((err) => {
        console.log(err)
        return dispatch(submitApplyFailure({ error: err}));
      });
  }

}

export function recoveryCapture(rid) {
  if (rid) {
    return request['post']('/admin/recovery', {
      recruiterKey: rid
    });
  }
}