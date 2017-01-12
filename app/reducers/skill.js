import { SkillTypes } from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case SkillTypes.GET_SKILLS_REQUEST:
      return true;
    case SkillTypes.GET_SKILLS_SUCCESS:
    case SkillTypes.GET_SKILLS_FAILURE:
      return false;
    default:
      return state;
  }
};

const skillOrder = (skill, order = 'asc') => {
  if (order === 'asc') {
    return skill.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  } else {
    return skill.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  }
}

const skill = (
  state = {},
  action
) => {
  switch (action.type) {
    case SkillTypes.CREATE_NEW_SKILL:
      return {
        type: '', 
        proficiency: undefined,
        lengthOfUse: undefined,
      }
    case SkillTypes.CHANGE_SKILL:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case SkillTypes.CREATE_SKILL_SUCCESS:
    case SkillTypes.CREATE_SKILL_FAILURE:
      return {};
    case SkillTypes.TOGGLE_SKILL_ADD:
      if (!action.data && action.persist) {
        return action.persist
      } else {
        return {};
      }
    default:
      return state;
  }
};

const skills = (
  state = [],
  action
) => {
  let updatedSkill
  switch (action.type) {
    case SkillTypes.GET_SKILLS_SUCCESS:
      return skillOrder(action.res.data)
    case SkillTypes.CREATE_SKILL_SUCCESS:
      const newSchools = state.concat(action.data);
      return skillOrder(newSchools)
    case SkillTypes.UPDATE_SKILL_SUCCESS:
      updatedSkill = state.slice()
      updatedSkill[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return skillOrder(updatedSkill)
    case SkillTypes.CHANGE_SKILLS:
      updatedSkill = [...state]
      updatedSkill[_.findIndex(updatedSkill, {_id: action.state.id})][action.state.field] = updatedSkill[_.findIndex(updatedSkill, {_id: action.state.id})][action.state.field] = action.state.value
      return skillOrder(updatedSkill)
    case SkillTypes.DELETE_SKILL_SUCCESS:
      const newState = state.slice();
      return newState.filter( j => {
        return j._id !== action.data.id;
      })
    case SkillTypes.CREATE_SKILL_REQUEST:
      return {
        data: action.res.data,
      };
    case SkillTypes.TOGGLE_SKILL_EDIT:
      updatedSkill = _.map(state, (s) => {return {...s, edit: false } });
      const t = updatedSkill[_.findIndex(updatedSkill, j => { return j._id === action.data._id})]
      t.edit = !action.data.edit
      return skillOrder(updatedSkill);
    default:
      return state;
  }
};

const addShow = (
  state = false,
  action
) => {
  switch (action.type) {
    case SkillTypes.TOGGLE_SKILL_ADD:
      return !action.data
    default:
      return state;
  }
};

const inputFocus = (
  state = false, 
  action
) => {
  switch (action.type) {
    case SkillTypes.TOGGLE_SKILL_INPUT_FOCUS:
      return action.data
    default:
      return state
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case SkillTypes.CREATE_SKILL_FAILURE:
      return action.error;
    case SkillTypes.DISMISS_LANGUAGE_MESSAGE:
      return '';
    default:
      return state
  }
}

const skillReducer = combineReducers({
  skill,
  skills,
  message,
  addShow,
  inputFocus,
  isFetching
});

export default skillReducer;