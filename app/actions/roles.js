import { polyfill } from 'es6-promise';
import request from 'axios';

import { RoleTypes } from 'types';

polyfill();

function makeRolesRequest(method, data, api = '/roles') {
  return request[method](api, data);
}

export function newRole() {
  return {
    type: RoleTypes.NEW_ROLE,
  };
}

export function roleChange(state) {
  return {
    type: RoleTypes.CHANGE_ROLE,
    state
  };
}

export function roleEditChange(state) {
  return {
    type: RoleTypes.CHANGE_ROLE_EDIT,
    state
  };
}

export function rolesChange(state) {
  return {
    type: RoleTypes.CHANGE_ROLES,
    state
  };
}

export function toggleRoleAdd (data) {
  return {
    type: RoleTypes.TOGGLE_ROLE_ADD,
    data: data
  };
}

export function toggleRoleEdit (data) {
  return {
    type: RoleTypes.TOGGLE_ROLE_EDIT,
    data: data
  };
}

export function fetchRole(id) {
  return {
    type: RoleTypes.GET_ROLE,
    promise: makeRolesRequest('get', {}, '/role/' + id)
  };
}

export function fetchRoles(id) {
  return {
    type: RoleTypes.GET_ROLES,
    promise: makeRolesRequest('get', {}, '/roles/' + id)
  };
}

export function createRoleRequest(data) {
  return {
    type: RoleTypes.CREATE_ROLE,
    data: data
  };
}

export function createRoleSuccess(data) {
  return {
    type: RoleTypes.CREATE_ROLE_SUCCESS,
    data: data
  };
}

export function createRoleFailure(data) {
  return {
    type: RoleTypes.CREATE_ROLE_FAILURE,
    error: data.err
  };
}

export function updateRoleRequest(data) {
  return {
    type: RoleTypes.UPDATE_ROLE,
    data: data
  }
}

export function updateRoleSuccess(data) {
  return {
    type: RoleTypes.UPDATE_ROLE_SUCCESS,
    data: data
  }
}

export function updateRoleFailure(data) {
  return {
    type: RoleTypes.UPDATE_ROLE_FAILURE,
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
    type: RoleTypes.DELETE_ROLE_REQUEST,
    data: data
  }
}

export function deleteRoleSuccess (data) {
  return {
    type: RoleTypes.DELETE_ROLE_SUCCESS,
    data: data
  }
}

export function deleteRoleFailure (data) {
  return {
    type: RoleTypes.DELETE_ROLE_FAILURE,
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
    type: RoleTypes.TOGGLE_ROLE_EDU_REQUIREMENT,  
    data: data
  }
}

export function toggleRoleSkillsAdd (data, persist = false) {
  return {
    type: RoleTypes.TOGGLE_ROLE_SKILL_ADD,
    data: data,
    persist: persist
  };
}

export function toggleRoleSkillsEdit(data, role) {
  return {
    type: RoleTypes.TOGGLE_ROLE_SKILL_EDIT_ADD,
    data: data,
    role: role
  };
}

export function toggleRoleSkillsEditAdd(data, role) {
  return {
    type: RoleTypes.TOGGLE_ROLE_SKILL_EDIT_ADD_ROLE,
    data: data,
    role: role
  };
}

export function fetchSkills(skillsArray) {
  const path = '/skill-list/' + JSON.stringify(skillsArray);
  return {
    type: RoleTypes.FETCH_ROLE_SKILLS,
    promise: makeRolesRequest('get', {}, path)
  }
}

export function skillChange(state) {
  return {
    type: RoleTypes.CHANGE_ROLE_SKILL,
    state
  };
}

export function skillsChange(state) {
  return {
    type: RoleTypes.CHANGE_ROLE_SKILLS,
    state
  };
}

export function createSkill(skillData) {
  return {
    type: RoleTypes.CREATE_ROLE_SKILL,
    skillData
  };
}

export function updateSkill(skillData) {
  return {
    type: RoleTypes.UPDATE_ROLE_SKILL,
    skillData
  };
}

export function saveSkills(skillData) {
  return (dispatch) => {
    return makeRolesRequest('post', skillData, '/roles')
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

export function updateSkills(skillData) {
  return (dispatch) => {
    return makeRolesRequest('put', skillData, '/roles')
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

export function deleteSkills(skillData) {
  return (dispatch) => {
    return makeRolesRequest('put', skillData, '/roles')
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

export function deleteSkill(skillData) {
  return {
    type: RoleTypes.DELETE_ROLE_SKILL,
    skillData
  };
}

// Edit Applicant Role Skills


export function toggleApplicantRoleSkill(data) {
  return {
    type: RoleTypes.TOGGLE_APPLICANT_ROLE_SKILLS,
    data
  };
}

// edit actions

export function editRoleSkillChange(state) {
  return {
    type: RoleTypes.EDIT_ROLE_SKILL,
    state
  };
}

export function editRoleSkillCreate(skillData) {
  return {
    type: RoleTypes.CREATE_EDIT_ROLE_SKILL,
    skillData
  };
}

export function deleteEditSkill(skillData) {
  return {
    type: RoleTypes.DELETE_EDIT_ROLE_SKILL,
    skillData
  };
}

export function updateEditSkill(skillData) {
  return {
    type: RoleTypes.UPDATE_EDIT_ROLE_SKILL,
    skillData
  };
}

export function skillsEditChange(state) {
  return {
    type: RoleTypes.CHANGE_EDIT_ROLE_SKILLS,
    state
  };
}

export function increment(roleCode) {
  return (dispatch) => {
    return makeRolesRequest('put', {role_id: roleCode}, '/role/increment')
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