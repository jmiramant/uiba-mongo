import * as types from 'types';
import { combineReducers } from 'redux';

const order = (applicants, order = 'asc') => {
  return applicants.sort((a, b) => {
    if (new Date(a.updatedAt) > new Date(b.updatedAt)) {
      return -1;
    } else {
      return 1;
    }
  });
}

const applicant = (
  state = {},
  action
) => {
  let updatedProfile;
  switch (action.type) {
    case types.GET_APPLICANT_SUCCESS:
      return action.res.data;
    case types.CHANGE_APPLICANT:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.GET_APPLICANT_FAILURE:
      return state;
    case types.UPDATE_APPLICANT_SUCCESS:
      return {...state}
    default:
      return state;
  }
};


const applicants = (
  state = [],
  action
) => {
  let updatedApplicants;
  switch (action.type) {
    case types.GET_APPLICANTS_SUCCESS:
      return order(action.res.data)
    case types.CREATE_APPLICANT_SUCCESS:
      const newApplicantss = state.concat(action.data);
      return order(newApplicantss)
    case types.CHANGE_APPLICANTS:
      updatedApplicants = [...state]
      const index = _.findIndex(state, {
        _id: action.state._id
      })
      updatedApplicants[index] = {...updatedApplicants[index], ...action.state}
      return order(updatedApplicants)
    case types.UPDATE_APPLICANT_SUCCESS:
      updatedApplicants = state.slice()
      updatedApplicants[_.findIndex(state, function(j) {
        return j._id === action.data._id;
      })] = action.data
      return order(updatedApplicants)
    case types.DELETE_APPLICANT_SUCCESS:
      const newState = state.slice();
      return newState.filter(j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_APPLICANT_REQUEST:
      return {
        data: action.res.data,
      };
    default:
      return state;
  }
};

const filters = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.APPLICANT_FILTER_CHANGE:
      return action.data;
    case types.APPLICANT_FILTER_CLEAR:
      return {};
    default:
      return state;
  }
}

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

const showSkillAdd = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_APPLICANT_FILTER_SKILL_ADD:
      return !state;
    default:
      return state;
  }
};

const skillFilter = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_NEW_APPLICANT_FILTER_SKILL:
      return {
        type: '', 
        proficiency: undefined,
        lengthOfUse: undefined,
      }
    case types.CHANGE_APPLICANT_FILTER_SKILL:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.CREATE_APPLICANT_FILTER_SKILL:
      return {
        type: '', 
        proficiency: undefined,
        lengthOfUse: undefined,
      };
    case types.TOGGLE_APPLICANT_FILTER_SKILL_ADD:
      if (!action.data && action.persist) {
        return action.persist
      } else {
        return {};
      }
    case types.CREATE_APPLICANT_FILTER_SUCCESS:
      return {
        type: '', 
        proficiency: undefined,
        lengthOfUse: undefined,
      };
    default:
      return state;
  }
};

const skillsFilter = (
  state = [],
  action
) => {
  let updatedSkill
  switch (action.type) {
    case types.CREATE_APPLICANT_FILTER_SKILL:
      return skillOrder([...state, action.skillData])
    case types.UPDATE_APPLICANT_FILTER_SKILL:
      updatedSkill = state.slice()
      updatedSkill[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return skillOrder(updatedSkill)
    case types.CHANGE_APPLICANT_FILTER_SKILLS:
      updatedSkill = [...state]
      updatedSkill[_.findIndex(updatedSkill, {type: action.state.type})][action.state.field] = updatedSkill[_.findIndex(updatedSkill, {type: action.state.type})][action.state.field] = action.state.value
      return skillOrder(updatedSkill)
    case types.DELETE_APPLICANT_FILTER_SKILL:
      const newState = state.slice();
      return newState.filter( j => {
        return j._id !== action.skillData.id;
      })
    case types.CREATE_APPLICANT_FILTER_SUCCESS:
      return [];
    case types.APPLICANT_FILTER_CLEAR:
      return [];
    default:
      return state;
  }
};

const educationFilter = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_ROLE_SUCCESS:
      return action.res.data.degreeRequirements
    case types.TOGGLE_APPLICANT_EDU_FILTER:
      const requirments = [...state];
      const dupIndex = requirments.indexOf(action.data);
      dupIndex !== -1 ? requirments.splice(dupIndex, 1) : requirments.push(action.data)
      return requirments
    case types.APPLICANT_FILTER_CLEAR:
      return [];
    default:
      return state;
  }
};

const profileReducer = combineReducers({
  filters,
  applicant,
  applicants,
  skillFilter,
  skillsFilter,
  showSkillAdd,
  educationFilter,
});

export default profileReducer;
