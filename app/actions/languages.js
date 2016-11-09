import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

export function newLanguage() {
  return {
    type: types.NEW_LANGUAGE,
  };
}

export function languageChange(state) {
  return {
    type: types.CHANGE_LANGUAGE,
    state
  };
}

export function languagesChange(state) {
  return {
    type: types.CHANGE_LANGUAGES,
    state
  };
}

export function toggleLanguageAdd (data, persist = false) {
  return {
    type: types.TOGGLE_LANGUAGE_ADD,
    data: data,
    persist: persist
  };
}

function makeLanguagesRequest(method, data, api = '/languages') {
  return request[method](api, data);
}

export function fetchLanguages(profId) {
  let path = '/languages/me';
  if (profId) path = '/languages/' + profId;
  return {
    type: types.GET_LANGUAGES,
    promise: makeLanguagesRequest('get', {}, path)
  };
}

export function createLanguageRequest(data) {
  return {
    type: types.CREATE_LANGUAGE,
    data: data
  };
}

export function createLanguageSuccess(data) {
  return {
    type: types.CREATE_LANGUAGE_SUCCESS,
    data: data
  };
}

export function createLanguageFailure(data) {
  return {
    type: types.CREATE_LANGUAGE_FAILURE,
    error: data.error
  };
}

export function updateLanguageRequest(data) {
  return {
    type: types.UPDATE_LANGUAGE,
    data: data
  }
}

export function updateLanguageSuccess(data) {
  return {
    type: types.UPDATE_LANGUAGE_SUCCESS,
    data: data
  }
}

export function updateLanguageFailure(data) {
  return {
    type: types.UPDATE_LANGUAGE_FAILURE,
    error: data.error
  };
}

export function createLanguage(languageData) {
  return (dispatch) => {
    dispatch(createLanguageRequest(languageData));
    
    return makeLanguagesRequest('post', languageData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(createLanguageSuccess(res.data));
        }
      })
      .catch((err) => {
        let error = err;
        if (err.response && err.response.data) {error = err.response.data;}
        return dispatch(createLanguageFailure({error: error}));
      });
  }
}

export function updateLanguage(languageData) {
  return (dispatch) => {

    dispatch(updateLanguageRequest(languageData));
    
    return makeLanguagesRequest('put', languageData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateLanguageSuccess(res.data));
        }
      })
      .catch((err) => {
        let error = err;
        if (err.response && err.response.data) {error = err.response.data;}        
        return dispatch(updateLanguageFailure({ error: error}));
      });
  }

}

export function deleteLanguageRequest (data) {
  return {
    type: types.DELETE_LANGUAGE_REQUEST,
    data: data
  }
}

export function deleteLanguageSuccess (data) {
  return {
    type: types.DELETE_LANGUAGE_SUCCESS,
    data: data
  }
}

export function deleteLanguageFailure (data) {
  return {
    type: types.DELETE_LANGUAGE_FAILURE,
    error: data.error
  }
}

export function deleteLanguage(language) {
  return (dispatch) => {

    dispatch(deleteLanguageRequest(language));

    return makeLanguagesRequest('delete', language, '/language/' + language._id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteLanguageSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(deleteLanguageFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your language.'}));
      });
  }

}

export function dismissError() {
  return { 
      type: types.DISMISS_LANGUAGE_ERROR 
  };  
}