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

export function fetchScores(profIds, filters) {
  return (dispatch) => {

    let f = '';
    if (filters && filters.skill.length) {
      const formatted = filters.skill.map((s) => {
        return {"skill": s.type, "lengthOfUse": s.lengthOfUse, "proficiency": s.proficiency}
      })
      f += '?skills=' + JSON.stringify(formatted);
    };

    return makeScoreRequest('post', {profileIds: profIds}, '/scores' + f)
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