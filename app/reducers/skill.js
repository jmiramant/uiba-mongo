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

const skills = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_SKILLS_SUCCESS:
      return skillOrder(action.res.data)
    case types.CREATE_SKILL_SUCCESS:
      const newSchools = state.concat(action.data);
      return skillOrder(newSchools)
    case types.UPDATE_SKILL_SUCCESS:
      const updatedSchool = state.slice()
      updatedSchool[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return skillOrder(updatedSchool)
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

const skillReducer = combineReducers({
  skills,
});

export default skillReducer;
