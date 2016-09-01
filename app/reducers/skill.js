import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

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
    case types.CREATE_NEW_SKILL:
      return {
        type: '', 
        proficiency: undefined,
        lengthOfUse: undefined,
        frequency: undefined,
      }
    case types.CHANGE_SKILL:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
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
    case types.GET_SKILLS_SUCCESS:
      return skillOrder(action.res.data)
    case types.CREATE_SKILL_SUCCESS:
      const newSchools = state.concat(action.data);
      return skillOrder(newSchools)
    case types.UPDATE_SKILL_SUCCESS:
      updatedSkill = state.slice()
      updatedSkill[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return skillOrder(updatedSkill)
    case types.CHANGE_SKILLS:
      updatedSkill = [...state]
      updatedSkill[_.findIndex(updatedSkill, {_id: action.state.id})][action.state.field] = updatedSkill[_.findIndex(updatedSkill, {_id: action.state.id})][action.state.field] = action.state.value
      return skillOrder(updatedSkill)
    case types.DELETE_SKILL_SUCCESS:
      const newState = state.slice();
      return newState.filter( j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_SKILL_REQUEST:
      return {
        data: action.res.data,
      };
    default:
      return state;
  }
};

const add = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_SKILL_ADD:
      return !action.data
    default:
      return state;
  }
};


const skillReducer = combineReducers({
  skill,
  skills,
  add
});

export default skillReducer;