import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

function makeRolesRequest(method, data, api = '/roles') {
  return request[method](api, data);
}

export function newRole() {
  return {
    type: types.NEW_ROLE,
  };
}

export function roleChange(state) {
  return {
    type: types.CHANGE_ROLE,
    state
  };
}

export function rolesChange(state) {
  return {
    type: types.CHANGE_ROLES,
    state
  };
}

export function toggleRoleAdd (data) {
  return {
    type: types.TOGGLE_ROLE_ADD,
    data: data
  };
}

export function fetchRole(id) {
  return {
    type: types.GET_ROLE,
    promise: makeRolesRequest('get', {}, '/role/' + id)
  };
}

export function fetchRoles(id) {
  return {
    type: types.GET_ROLES,
    promise: makeRolesRequest('get', {}, '/roles/' + id)
  };
}

export function createRoleRequest(data) {
  return {
    type: types.CREATE_ROLE,
    data: data
  };
}

export function createRoleSuccess(data) {
  return {
    type: types.CREATE_ROLE_SUCCESS,
    data: data
  };
}

export function createRoleFailure(data) {
  return {
    type: types.CREATE_ROLE_FAILURE,
    error: data.err
  };
}

export function updateRoleRequest(data) {
  return {
    type: types.UPDATE_ROLE,
    data: data
  }
}

export function updateRoleSuccess(data) {
  return {
    type: types.UPDATE_ROLE_SUCCESS,
    data: data
  }
}

export function updateRoleFailure(data) {
  return {
    type: types.UPDATE_ROLE_FAILURE,
    error: data.error
  };
}

export function createRole(roleData) {
  return (dispatch) => {
    dispatch(createRoleRequest(roleData));
    
    return makeRolesRequest('post', roleData, '/roles')
      .then(res => {
        if (res.status === 200) {
          return dispatch(createRoleSuccess(res.data));
        }
      })
      .catch((err) => {
        return dispatch(createRoleFailure({ err }));
      });
  }
}

export function updateRole(roleData) {
  return (dispatch) => {

    dispatch(updateRoleRequest(roleData));
    
    return makeRolesRequest('put', roleData, '/roles')
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateRoleSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(updateRoleFailure({ error: 'Oops! Something went wrong and we couldn\'t create your role.'}));
      });
  }

}

export function deleteRoleRequest (data) {
  return {
    type: types.DELETE_ROLE_REQUEST,
    data: data
  }
}

export function deleteRoleSuccess (data) {
  return {
    type: types.DELETE_ROLE_SUCCESS,
    data: data
  }
}

export function deleteRoleFailure (data) {
  return {
    type: types.DELETE_ROLE_FAILURE,
    error: data.error
  }
}

export function deleteRole(role) {
  return (dispatch) => {

    dispatch(deleteRoleRequest(role));

    return makeRolesRequest('delete', role, '/roles/' + role._id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteRoleSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(deleteRoleFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your role.'}));
      });
  }

}

export function toggleEduReqSelect(data) {
  return {
    type: types.TOGGLE_ROLE_EDU_REQUIREMENT,  
    data: data
  }
}

export function toggleRoleSkillsAdd (data, persist = false) {
  return {
    type: types.TOGGLE_ROLE_SKILL_ADD,
    data: data,
    persist: persist
  };
}

export function skillChange(state) {
  return {
    type: types.CHANGE_ROLE_SKILL,
    state
  };
}

export function skillsChange(state) {
  return {
    type: types.CHANGE_ROLE_SKILLS,
    state
  };
}

export function createSkill(skillData) {
  return {
    type: types.CREATE_ROLE_SKILL,
    skillData
  };
}

export function updateSkill(skillData) {
  return {
    type: types.UPDATE_ROLE_SKILL,
    skillData
  };
}

export function deleteSkill(skillData) {
  return {
    type: types.DELETE_ROLE_SKILL,
    skillData
  };
}