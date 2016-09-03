import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const projectOrder = (project, order = 'asc') => {
  if (order === 'asc') {
    return project.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  } else {
    return project.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  }
}

const project = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_NEW_PROJECT:
      return {
        profile_id: undefined,
        name: undefined,
        description: undefined,
        projectUrl: undefined,
        startDate: undefined,
        endDate: undefined,
        current: undefined,
      }
    case types.CHANGE_PROJECT:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.CREATE_PROJECT_SUCCESS:
      return {};
    default:
      return state;
  }
};

const projects = (
  state = [],
  action
) => {
  let updatedProject;
  switch (action.type) {
    case types.GET_PROJECTS_SUCCESS:
      return projectOrder(action.res.data)
    case types.CREATE_PROJECT_SUCCESS:
      const newSchools = state.concat(action.data);
      return projectOrder(newSchools)
    case types.CHANGE_PROJECTS:
      updatedProject = [...state]
      updatedProject[_.findIndex(updatedProject, {_id: action.state.id})][action.state.field] = updatedProject[_.findIndex(updatedProject, {_id: action.state.id})][action.state.field] = action.state.value
      return projectOrder(updatedProject)
    case types.UPDATE_PROJECT_SUCCESS:
      updatedProject = state.slice()
      updatedProject[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return projectOrder(updatedProject)
    case types.DELETE_PROJECT_SUCCESS:
      const newState = state.slice();
      return newState.filter( j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_PROJECT_REQUEST:
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
    case types.TOGGLE_PROJECT_ADD:
      return !action.data
    default:
      return state;
  }
};

const projectReducer = combineReducers({
  project,
  projects,
  addShow
});

export default projectReducer;
