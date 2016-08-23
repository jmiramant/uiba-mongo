import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

function makeSchoolsRequest(method, data, api = '/schools') {
  return request[method](api, data);
}

export function fetchSchools() {
  return {
    type: types.GET_SCHOOLS,
    promise: makeSchoolsRequest('get')
  };
}

export function createSchoolRequest(data) {
  return {
    type: types.CREATE_SCHOOL,
    data: data
  };
}

export function createSchoolSuccess(data) {
  return {
    type: types.CREATE_SCHOOL_SUCCESS,
    data: data
  };
}

export function createSchoolFailure(data) {
  return {
    type: types.CREATE_SCHOOL_FAILURE,
    error: data.error
  };
}

export function updateSchoolRequest(data) {
  return {
    type: types.UPDATE_SCHOOL,
    data: data
  }
}

export function updateSchoolSuccess(data) {
  return {
    type: types.UPDATE_SCHOOL_SUCCESS,
    data: data
  }
}

export function updateSchoolFailure(data) {
  return {
    type: types.UPDATE_SCHOOL_FAILURE,
    error: data.error
  };
}

export function createSchool(schoolData) {
  let dispatch = this;

  return () => {
    dispatch(createSchoolRequest(schoolData));
    
    return makeSchoolsRequest('post', schoolData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(createSchoolSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(createSchoolFailure({ error: 'Oops! Something went wrong and we couldn\'t create your school.'}));
      });
  }
}

export function updateSchool(schoolData) {
  let dispatch = this;
  return () => {

    dispatch(updateSchoolRequest(schoolData));
    
    return makeSchoolsRequest('put', schoolData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateSchoolSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(updateSchoolFailure({ error: 'Oops! Something went wrong and we couldn\'t create your school.'}));
      });
  }

}

export function deleteSchoolRequest (data) {
  return {
    type: types.DELETE_SCHOOL_REQUEST,
    data: data
  }
}

export function deleteSchoolSuccess (data) {
  return {
    type: types.DELETE_SCHOOL_SUCCESS,
    data: data
  }
}

export function deleteSchoolFailure (data) {
  return {
    type: types.DELETE_SCHOOL_FAILURE,
    error: data.error
  }
}

export function deleteSchool(school) {
  let dispatch = this;
  return () => {

    dispatch(deleteSchoolRequest(school));

    return makeSchoolsRequest('delete', school, '/school/' + school._id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteSchoolSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(deleteSchoolFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your school.'}));
      });
  }

}
