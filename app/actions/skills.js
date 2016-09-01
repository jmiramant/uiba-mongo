import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

export function newSkill() {
  return {
    type: types.NEW_SKILL,
  };
}

export function skillChange(state) {
  return {
    type: types.CHANGE_SKILL,
    state
  };
}

export function skillsChange(state) {
  return {
    type: types.CHANGE_SKILLS,
    state
  };
}

export function toggleSkillAdd (data) {
  return {
    type: types.TOGGLE_SKILL_ADD,
    data: data
  };
}

function makeSkillsRequest(method, data, api = '/skills') {
  return request[method](api, data);
}

export function fetchSkills() {
  return {
    type: types.GET_SKILLS,
    promise: makeSkillsRequest('get')
  };
}

export function createSkillRequest(data) {
  return {
    type: types.CREATE_SKILL,
    data: data
  };
}

export function createSkillSuccess(data) {
  return {
    type: types.CREATE_SKILL_SUCCESS,
    data: data
  };
}

export function createSkillFailure(data) {
  return {
    type: types.CREATE_SKILL_FAILURE,
    error: data.error
  };
}

export function updateSkillRequest(data) {
  return {
    type: types.UPDATE_SKILL,
    data: data
  }
}

export function updateSkillSuccess(data) {
  return {
    type: types.UPDATE_SKILL_SUCCESS,
    data: data
  }
}

export function updateSkillFailure(data) {
  return {
    type: types.UPDATE_SKILL_FAILURE,
    error: data.error
  };
}

export function createSkill(skillData) {
  return (dispatch) => {
    dispatch(createSkillRequest(skillData));
    
    return makeSkillsRequest('post', skillData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(createSkillSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(createSkillFailure({ error: 'Oops! Something went wrong and we couldn\'t create your skill.'}));
      });
  }
}

export function updateSkill(skillData) {
  return (dispatch) => {

    dispatch(updateSkillRequest(skillData));
    
    return makeSkillsRequest('put', skillData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateSkillSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(updateSkillFailure({ error: 'Oops! Something went wrong and we couldn\'t create your skill.'}));
      });
  }

}

export function deleteSkillRequest (data) {
  return {
    type: types.DELETE_SKILL_REQUEST,
    data: data
  }
}

export function deleteSkillSuccess (data) {
  return {
    type: types.DELETE_SKILL_SUCCESS,
    data: data
  }
}

export function deleteSkillFailure (data) {
  return {
    type: types.DELETE_SKILL_FAILURE,
    error: data.error
  }
}

export function deleteSkill(skill) {
  return (dispatch) => {
    dispatch(deleteSkillRequest(skill));

    return makeSkillsRequest('delete', skill, '/skill/' + skill._id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteSkillSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(deleteSkillFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your skill.'}));
      });
  }

}
