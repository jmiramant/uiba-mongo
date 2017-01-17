import { polyfill } from 'es6-promise';
import request from 'axios';

import { SchoolTypes } from 'types';

polyfill();

export function newSchool() {
  return {
    type: SchoolTypes.NEW_SCHOOL,
  };
}

export function schoolChange(state) {
  return {
    type: SchoolTypes.CHANGE_SCHOOL,
    state
  };
}

export function schoolsChange(state) {
  return {
    type: SchoolTypes.CHANGE_SCHOOLS,
    state
  };
}

export function toggleSchoolAdd (data) {
  return {
    type: SchoolTypes.TOGGLE_SCHOOL_ADD,
    data: data
  };
}

export function toggleSchoolEdit (data) {
  return {
    type: SchoolTypes.TOGGLE_SCHOOL_EDIT,
    data: data
  };
}

function makeSchoolsRequest(method, data, api = '/schools') {
  return request[method](api, data);
}

export function fetchSchools(profId) {
  let path = '/schools/me'
  if (profId) path = '/schools/' + profId
  return {
    type: SchoolTypes.GET_SCHOOLS,
    promise: makeSchoolsRequest('get', {}, path)
  };
}

export function createSchoolRequest(data) {
  return {
    type: SchoolTypes.CREATE_SCHOOL,
    data: data
  };
}

export function createSchoolSuccess(data) {
  return {
    type: SchoolTypes.CREATE_SCHOOL_SUCCESS,
    data: data
  };
}

export function createSchoolFailure(data) {
  return {
    type: SchoolTypes.CREATE_SCHOOL_FAILURE,
    error: data.error
  };
}

export function updateSchoolRequest(data) {
  return {
    type: SchoolTypes.UPDATE_SCHOOL,
    data: data
  }
}

export function updateSchoolSuccess(data) {
  return {
    type: SchoolTypes.UPDATE_SCHOOL_SUCCESS,
    data: data
  }
}

export function updateSchoolFailure(data) {
  return {
    type: SchoolTypes.UPDATE_SCHOOL_FAILURE,
    error: data.error
  };
}

export function createSchool(schoolData) {
  return (dispatch) => {
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
  return (dispatch) => {

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
    type: SchoolTypes.DELETE_SCHOOL_REQUEST,
    data: data
  }
}

export function deleteSchoolSuccess (data) {
  return {
    type: SchoolTypes.DELETE_SCHOOL_SUCCESS,
    data: data
  }
}

export function deleteSchoolFailure (data) {
  return {
    type: SchoolTypes.DELETE_SCHOOL_FAILURE,
    error: data.error
  }
}

export function deleteSchool(school) {
  return (dispatch) => {

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
