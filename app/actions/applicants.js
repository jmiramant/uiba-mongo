import { polyfill } from 'es6-promise';
import request from 'axios';

import { ApplicantTypes } from 'types';

polyfill();

function makeApplicantRequest(method, data, api = '/applicant') {
  return request[method](api, data);
}

export function fetchApplicants(id) {
  return {
    type: ApplicantTypes.GET_APPLICANTS,
    promise: makeApplicantRequest('get', {}, '/applicants/' + id)
  }
}

export function fetchApplicant(profId) {
  let path = '/profile';
  if (profId) {
    path = '/profile/' + profId;
  }
  
  return {
    type: ApplicantTypes.GET_APPLICANT,
    promise: makeApplicantRequest('get', {}, path)
  }
}

export function filterChange(data) {
  return {
    type: ApplicantTypes.APPLICANT_FILTER_CHANGE,
    data
  }
}

export function toggleEduReqSelect(data) {
  return {
    type: ApplicantTypes.TOGGLE_APPLICANT_EDU_FILTER,  
    data: data
  }
}

export function toggleRoleSkillsAdd (data, persist = false) {
  return {
    type: ApplicantTypes.TOGGLE_APPLICANT_FILTER_SKILL_ADD,
    data: data,
    persist: persist
  };
}

export function skillChange(state) {
  return {
    type: ApplicantTypes.CHANGE_APPLICANT_FILTER_SKILL,
    state
  };
}

export function skillsChange(state) {
  return {
    type: ApplicantTypes.CHANGE_APPLICANT_FILTER_SKILLS,
    state
  };
}

export function createSkill(skillData) {
  return {
    type: ApplicantTypes.CREATE_APPLICANT_FILTER_SKILL,
    skillData
  };
}

export function updateSkill(skillData) {
  return {
    type: ApplicantTypes.UPDATE_APPLICANT_FILTER_SKILL,
    skillData
  };
}

export function deleteSkill(skillData) {
  return {
    type: ApplicantTypes.DELETE_APPLICANT_FILTER_SKILL,
    skillData
  };
}

export function clearFilters() {
  return {
    type: ApplicantTypes.APPLICANT_FILTER_CLEAR,
  };
}

export function removeFilter(data) {
  return {
    type: ApplicantTypes.APPLICANT_FILTER_REMOVE,
    data: data
  }
}

export function updateFilters(filters) {
  return {
    type: ApplicantTypes.UPDATE_APPLICANT_FILTERS,
    filters
  };
}