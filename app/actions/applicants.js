import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

function makeApplicantRequest(method, data, api = '/applicant') {
  return request[method](api, data);
}

export function fetchApplicants(id) {
  return {
    type: types.GET_APPLICANTS,
    promise: makeApplicantRequest('get', {}, '/applicants/' + id)
  }
}

export function fetchApplicant(profId) {
  let path = '/profile';
  if (profId) {
    path = '/profile/' + profId;
  }
  
  return {
    type: types.GET_APPLICANT,
    promise: makeApplicantRequest('get', {}, path)
  }
}

export function filterChange(data) {
  return {
    type: types.APPLICANT_FILTER_CHANGE,
    data
  }
}

export function toggleEduReqSelect(data) {
  return {
    type: types.TOGGLE_APPLICANT_EDU_FILTER,  
    data: data
  }
}

export function toggleRoleSkillsAdd (data, persist = false) {
  return {
    type: types.TOGGLE_APPLICANT_FILTER_SKILL_ADD,
    data: data,
    persist: persist
  };
}

export function skillChange(state) {
  return {
    type: types.CHANGE_APPLICANT_FILTER_SKILL,
    state
  };
}

export function skillsChange(state) {
  return {
    type: types.CHANGE_APPLICANT_FILTER_SKILLS,
    state
  };
}

export function createSkill(skillData) {
  return {
    type: types.CREATE_APPLICANT_FILTER_SKILL,
    skillData
  };
}

export function updateSkill(skillData) {
  return {
    type: types.UPDATE_APPLICANT_FILTER_SKILL,
    skillData
  };
}

export function deleteSkill(skillData) {
  return {
    type: types.DELETE_APPLICANT_FILTER_SKILL,
    skillData
  };
}

export function fetchFilterSkills(skillsArray) {
  const path = '/skill-list/' + JSON.stringify(skillsArray);
  return {
    type: types.FETCH_APPLICANTS_FILTER_SKILLS,
    promise: makeApplicantRequest('get', {}, path)
  }
}

export function clearFilters() {
  return {
    type: types.APPLICANT_FILTER_CLEAR,
  };
}

export function removeFilter(data) {
  return {
    type: types.APPLICANT_FILTER_REMOVE,
    data: data
  }
}

export function updateFilters(filters) {
  return {
    type: types.UPDATE_APPLICANT_FILTERS,
    filters
  };
}