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
    case types.TOGGLE_ROLE_EDIT:
      return false
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
    case types.GET_ROLE_SUCCESS:
      return skillOrder(action.res.data.skills);
    case types.UPDATE_ROLE_SUCCESS:
      return skillOrder(action.data.skills);
    case types.GET_ROLES_SUCCESS:
      return [];
    case types.FETCH_APPLICANTS_FILTER_SKILLS_SUCCESS:
      return skillOrder(action.res.data);
    case types.CREATE_ROLE_SKILL:
      return skillOrder([...state, action.skillData])
    case types.UPDATE_ROLE_SKILL:
      updatedSkill = [...state];
      updatedSkill[_.findIndex(state, (j) => { return j.type === action.skillData.type; })] = action.skillData
      return skillOrder(updatedSkill)
    case types.CHANGE_ROLE_SKILLS:
      updatedSkill = [...state];
      updatedSkill[_.findIndex(updatedSkill, {type: action.state.type})][action.state.field] = action.state.value
      return skillOrder(updatedSkill);
    case types.DELETE_ROLE_SKILL:
      updatedSkill = [...state];
      return skillOrder(_.filter(updatedSkill, j => {
        return j.type !== action.skillData.type;
      }));
    case types.TOGGLE_ROLE_ADD:
    case types.CREATE_ROLE_SUCCESS:
      return [];
    default:
      return state;
  }
};

const editShow = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_ROLE_EDIT:
      let resp = false;
      if (action.data && action.data._id) resp = true;
      return resp
    case types.TOGGLE_ROLE_ADD:
      return false;
    default:
      return state;
  }
};

const editSkill = (
  state = {},
  action
) => {
  let resp;
  switch (action.type) {
    case types.EDIT_ROLE_SKILL:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.TOGGLE_ROLE_SKILL_EDIT_ADD:
      resp = action.persist;
      if (action.data === true) resp = {};
      return resp;
    default:
      return state;
  }
};


const roleEdit = (
  state = {},
  action
) => {
  let resp;
  let s;
  switch (action.type) {
    case types.CHANGE_ROLE_EDIT:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.CREATE_EDIT_ROLE_SKILL:
      s = {...state};
      s.skills.push(action.skillData);
      skillOrder(s.skills)
      return s;
    case types.DELETE_EDIT_ROLE_SKILL: 
      s = {...state};
      s.skills  = skillOrder(_.filter(s.skills, j => {
        return j.type !== action.skillData.type;
      }));
      return s;
    case types.UPDATE_EDIT_ROLE_SKILL:
      s = {...state};
      s.skills[_.findIndex(s.skills, (j) => { return j.type === action.skillData.type; })] = action.skillData;
      return s;
    case types.CHANGE_EDIT_ROLE_SKILLS:
      s = {...state};
      s.skills[_.findIndex(s.skills, {type: action.state.type})][action.state.field] = action.state.value
      skillOrder(s.skills);
      return s;
    case types.TOGGLE_ROLE_EDIT:
      const a = action.data;
      a ? resp = {_id: a._id, title: a.title, skills: a.skills, description: a.description} : resp = {};
      return resp;
    default:
      return state;
  }
};

const showEditSkillAdd = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_ROLE_SKILL_EDIT_ADD:
      return !state;
    default:
      return state;
  }
};

const roleReducer = combineReducers({
  role,
  roles,
  skill,
  skills,
  addShow,
  editSkill,
  roleEdit,
  editShow,
  isFetching,
  showSkillAdd,
  showEditSkillAdd
});

export default roleReducer;