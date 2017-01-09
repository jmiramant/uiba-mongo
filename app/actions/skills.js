import { polyfill } from 'es6-promise';
import request from 'axios';

import { SkillTypes } from 'types';

polyfill();

export function newSkill() {
  return {
    type: SkillTypes.NEW_SKILL,
  };
}

export function skillChange(state) {
  return {
    type: SkillTypes.CHANGE_SKILL,
    state
  };
}

export function skillsChange(state) {
  return {
    type: SkillTypes.CHANGE_SKILLS,
    state
  };
}

export function toggleSkillAdd (data, persist = false) {
  return {
    type: SkillTypes.TOGGLE_SKILL_ADD,
    data: data,
    persist: persist
  };
}

function makeSkillsRequest(method, data, api = '/skills') {
  return request[method](api, data);
}

export function fetchSkills(profId) {
  let path = '/skills/me';
  if (profId) path = '/skills/' + profId;
  return {
    type: SkillTypes.GET_SKILLS,
    promise: makeSkillsRequest('get', {}, path)
  };
}

export function fetchSkillsList(idArray) {
  return {
    type: SkillTypes.GET_SKILLS,
    promise: makeSkillsRequest('get', {}, '/skill-list/' + idArray)
  };
}

export function createSkillRequest(data) {
  return {
    type: SkillTypes.CREATE_SKILL,
    data: data
  };
}

export function createSkillSuccess(data) {
  return {
    type: SkillTypes.CREATE_SKILL_SUCCESS,
    data: data
  };
}

export function createSkillFailure(data) {
  return {
    type: SkillTypes.CREATE_SKILL_FAILURE,
    error: data.error
  };
}

export function updateSkillRequest(data) {
  return {
    type: SkillTypes.UPDATE_SKILL,
    data: data
  }
}

export function updateSkillSuccess(data) {
  return {
    type: SkillTypes.UPDATE_SKILL_SUCCESS,
    data: data
  }
}

export function updateSkillFailure(data) {
  return {
    type: SkillTypes.UPDATE_SKILL_FAILURE,
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
      .catch((err) => {
        let error = err
        if (err.response && err.response.data) { error = err.response.data }
        return dispatch(createSkillFailure({error: error}));
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
    type: SkillTypes.DELETE_SKILL_REQUEST,
    data: data
  }
}

export function deleteSkillSuccess (data) {
  return {
    type: SkillTypes.DELETE_SKILL_SUCCESS,
    data: data
  }
}

export function deleteSkillFailure (data) {
  return {
    type: SkillTypes.DELETE_SKILL_FAILURE,
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

export function handleInputFocus(show) {
  return {
    type: SkillTypes.TOGGLE_SKILL_INPUT_FOCUS,
    data: show
  }
}