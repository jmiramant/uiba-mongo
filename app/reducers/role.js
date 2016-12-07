import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_ROLES_REQUEST:
    case types.GET_ROLE_REQUEST:
      return true;
    case types.GET_ROLES_SUCCESS:
    case types.GET_ROLES_FAILURE:
    case types.GET_ROLE_SUCCESS:
    case types.GET_ROLE_FAILURE:
      return false;
    default:
      return state;
  }
};

const roleOrder = (roles, order = 'asc') => {
  return roles.sort((a, b) => {
    if (new Date(a.createdAt) > new Date(b.createdAt)) {
      return -1;
    } else {
      return 1;
    }
  });
}

const blank =  {
  company_id: null,
  address_id: null,
  title: '',
  description: '',
  applicantCode: '',
  degreeRequirements: [],
  experienceMin: 0,
  experienceMin: 10,
  appliedCount: 0
}

const role = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.GET_ROLE_SUCCESS:
      return action.res.data;
    case types.CREATE_NEW_ROLE:
      return state;
    case types.CHANGE_ROLE:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.GET_ROLES_SUCCESS:
    case types.CREATE_ROLE_SUCCESS:
      return blank;
    default:
      return state;
  }
};

const roles = (
  state = [],
  action
) => {
  let updatedRole, unarchived;
  switch (action.type) {
    case types.GET_ROLES_SUCCESS:
      unarchived = _.filter(action.res.data, {'isArchived': false})
      return roleOrder(unarchived)
    case types.CREATE_ROLE_SUCCESS:
      const newRoles = state.concat(action.data);
      return roleOrder(newRoles)
    case types.CHANGE_ROLES:
      updatedRole = [...state]
      const index = _.findIndex(state, {
        _id: action.state._id
      })
      updatedRole[index] = {...updatedRole[index], ...action.state}
      return roleOrder(updatedRole)
    case types.UPDATE_ROLE_SUCCESS:
      updatedRole = state.slice()
      updatedRole[_.findIndex(state, function(j) {
        return j._id === action.data._id;
      })] = action.data
      unarchived = _.filter(updatedRole, {'isArchived': false})
      return roleOrder(unarchived)
    case types.DELETE_ROLE_SUCCESS:
      const newState = state.slice();
      return newState.filter(j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_ROLE_REQUEST:
      return {
        data: action.res.data,
      };
    default:
      return state;
  }
};

const addShow = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_ROLE_ADD:
      return !action.data
    default:
      return state;
  }
};

const eduRequirements = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_ROLE_SUCCESS:
      return action.res.data.filter.school
    case types.TOGGLE_ROLE_EDU_REQUIREMENT:
      const requirments = [...state];
      const dupIndex = requirments.indexOf(action.data);
      dupIndex !== -1 ? requirments.splice(dupIndex, 1) : requirments.push(action.data)
      return requirments
    default:
      return state;
  }
};

const showSkillAdd = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_ROLE_SKILL_ADD:
      return !state;
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
    case types.CREATE_NEW_ROLE_SKILL:
      return {
        type: '', 
        proficiency: undefined,
        lengthOfUse: undefined,
      }
    case types.CHANGE_ROLE_SKILL:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.CREATE_ROLE_SKILL:
      return {};
    case types.TOGGLE_ROLE_SKILL_ADD:
      if (!action.data && action.persist) {
        return action.persist
      } else {
        return {};
      }
    case types.CREATE_ROLE_SUCCESS:
      return {
        type: '', 
        proficiency: undefined,
        lengthOfUse: undefined,
      };
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
    case types.CREATE_ROLE_SKILL:
      return skillOrder([...state, action.skillData])
    case types.UPDATE_ROLE_SKILL:
      debugger
      updatedSkill = state.slice()
      updatedSkill[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return skillOrder(updatedSkill)
    case types.CHANGE_ROLE_SKILLS:
      updatedSkill = [...state]
      debugger
      updatedSkill[_.findIndex(updatedSkill, {type: action.state.type})][action.state.field] = updatedSkill[_.findIndex(updatedSkill, {type: action.state.type})][action.state.field] = action.state.value
      return skillOrder(updatedSkill)
    case types.DELETE_ROLE_SKILL:
      debugger
      const newState = state.slice();
      return newState.filter( j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_ROLE_SUCCESS:
      return [];
    default:
      return state;
  }
};


const roleReducer = combineReducers({
  isFetching,
  role,
  roles,
  addShow,
  eduRequirements,
  skill,
  skills,
  showSkillAdd
});

export default roleReducer;