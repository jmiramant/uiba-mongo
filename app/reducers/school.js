import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_SCHOOLS_REQUEST:
      return true;
    case types.GET_SCHOOLS_SUCCESS:
    case types.GET_SCHOOLS_FAILURE:
      return false;
    default:
      return state;
  }
};

const schoolOrder = (school, order = 'asc') => {
  if (order === 'asc') {
    return school.sort( (a,b) => {
      if (new Date(a.startDate) > new Date(b.startDate)) { 
        return -1; 
      } else {
        return 1; 
      }
    });    
  } else {
    return school.sort( (a,b) => {
      if (new Date(a.startDate) < new Date(b.startDate)) { 
        return -1; 
      } else {
        return 1; 
      }
    });    
  }
}


const validations = (
  state = {},
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
}

const school = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_NEW_SCHOOL:
      return {
        profile_id: undefined,
        name: undefined,
        major: undefined,
        minor: undefined,
        degree: undefined,
        startDate: undefined,
        endDate: undefined,
        current: undefined,
        type: undefined
      }
    case types.CHANGE_SCHOOL:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.CREATE_SCHOOL_SUCCESS:
      return {};
    default:
      return state;
  }
};

const schools = (
  state = [],
  action
) => {
  let updatedSchool;
  switch (action.type) {
    case types.GET_SCHOOLS_SUCCESS:
      return schoolOrder(action.res.data)
    case types.CREATE_SCHOOL_SUCCESS:
      const newSchools = state.concat(action.data);
      return schoolOrder(newSchools)
    case types.CHANGE_SCHOOLS:
      updatedSchool = [...state]
      updatedSchool[_.findIndex(updatedSchool, {_id: action.state.id})][action.state.field] = updatedSchool[_.findIndex(updatedSchool, {_id: action.state.id})][action.state.field] = action.state.value
      return schoolOrder(updatedSchool)
    case types.UPDATE_SCHOOL_SUCCESS:
      updatedSchool = state.slice()
      updatedSchool[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return schoolOrder(updatedSchool)
    case types.DELETE_SCHOOL_SUCCESS:
      const newState = state.slice();
      return newState.filter( j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_SCHOOL_REQUEST:
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
    case types.TOGGLE_SCHOOL_ADD:
      return !action.data
    default:
      return state;
  }
};

const schoolReducer = combineReducers({
  school,
  schools,
  addShow,
  validations,
  isFetching,
});

export default schoolReducer;
