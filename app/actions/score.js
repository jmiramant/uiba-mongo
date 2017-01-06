import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

function makeScoreRequest(method, data, api = '/scores') {
  return request[method](api, data);
}

export function clearScores () {
  return {
    type: types.CLEAR_SCORES
  }  
}

export function fetchScoreRequest (data) {
  return {
    type: types.GET_SCORES_REQUEST,
    data: data
  }
}

export function fetchScoreSuccess (data) {
  return {
    type: types.GET_SCORES_SUCCESS,
    data: data
  }
}

export function fetchScoreFailure (data) {
  return {
    type: types.GET_SCORES_FAILURE,
    error: data.error
  }
}

export function syncScoreSuccess (data) {
  return {
    type: types.SYNC_SCORES_SUCCESS,
    data: data
  }
}

export function syncScoreFailure (data) {
  return {
    type: types.SYNC_SCORES_FAILURE,
    error: data.error
  }
}
export function syncScores () {
  return (dispatch) => {
    return makeScoreRequest('put', null, '/scores/sync')
      .then(res => {
        if (res.status === 200) {
          return dispatch(syncScoreSuccess(res.data));
        }
      })
      .catch((err) => {
        return dispatch(syncScoreFailure({ error: err}));
      });
  }
}

export function fetchScores(profIds, skills) {
  return (dispatch) => {

    const formatted = skills.map((s) => {
      return {"skill": s.type, "lengthOfUse": s.lengthOfUse, "proficiency": s.proficiency}
    });

    return makeScoreRequest('post', {"profile_ids": profIds, "job_filters": formatted}, '/scores')
      .then(res => {
        if (res.status === 200) {
          return dispatch(fetchScoreSuccess(res.data));
        }
      })
      .catch((err) => {
        return dispatch(fetchScoreFailure({ error: err}));
      });
  }

}