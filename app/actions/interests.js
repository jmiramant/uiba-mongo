import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

export function newInterest() {
  return {
    type: types.NEW_INTEREST,
  };
}

export function interestChange(state) {
  return {
    type: types.CHANGE_INTEREST,
    state
  };
}

export function interestsChange(state) {
  return {
    type: types.CHANGE_INTERESTS,
    state
  };
}

export function toggleInterestAdd (data, persist = false) {
  return {
    type: types.TOGGLE_INTEREST_ADD,
    data: data,
    persist: persist
  };
}

function makeInterestsRequest(method, data, api = '/interests') {
  return request[method](api, data);
}

export function fetchInterests(profId) {
  let path = '/interests/me'
  if (profId) path = '/interests/' + profId
  return {
    type: types.GET_INTERESTS,
    promise: makeInterestsRequest('get', {}, path)
  };
}

export function createInterestRequest(data) {
  return {
    type: types.CREATE_INTEREST,
    data: data
  };
}

export function createInterestSuccess(data) {
  return {
    type: types.CREATE_INTEREST_SUCCESS,
    data: data
  };
}

export function createInterestFailure(data) {
  return {
    type: types.CREATE_INTEREST_FAILURE,
    error: data.error
  };
}

export function updateInterestRequest(data) {
  return {
    type: types.UPDATE_INTEREST,
    data: data
  }
}

export function updateInterestSuccess(data) {
  return {
    type: types.UPDATE_INTEREST_SUCCESS,
    data: data
  }
}

export function updateInterestFailure(data) {
  return {
    type: types.UPDATE_INTEREST_FAILURE,
    error: data.error
  };
}

export function createInterest(interestData) {
  return (dispatch) => {
    dispatch(createInterestRequest(interestData));
    
    return makeInterestsRequest('post', interestData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(createInterestSuccess(res.data));
        }
      })
      .catch((err) => {
        let error = err;
        if (err.response && err.response.data) {error = err.response.data;}
        return dispatch(createInterestFailure({error: error}));
      });
  }
}

export function updateInterest(interestData) {
  return (dispatch) => {

    dispatch(updateInterestRequest(interestData));
    
    return makeInterestsRequest('put', interestData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateInterestSuccess(res.data));
        }
      })
      .catch((err) => {
        let error = err;
        if (err.response && err.response.data) {error = err.response.data;}        
        return dispatch(updateInterestFailure({ error: error}));
      });
  }

}

export function deleteInterestRequest (data) {
  return {
    type: types.DELETE_INTEREST_REQUEST,
    data: data
  }
}

export function deleteInterestSuccess (data) {
  return {
    type: types.DELETE_INTEREST_SUCCESS,
    data: data
  }
}

export function deleteInterestFailure (data) {
  return {
    type: types.DELETE_INTEREST_FAILURE,
    error: data.error
  }
}

export function deleteInterest(interest) {
  return (dispatch) => {

    dispatch(deleteInterestRequest(interest));

    return makeInterestsRequest('delete', interest, '/interest/' + interest._id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteInterestSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(deleteInterestFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your interest.'}));
      });
  }

}

export function dismissError() {
  return { 
      type: types.DISMISS_INTEREST_ERROR 
  };  
}