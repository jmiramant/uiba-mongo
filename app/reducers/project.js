import { ProjectTypes } from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case ProjectTypes.GET_PROJECTS_REQUEST:
      return true;
    case ProjectTypes.GET_PROJECTS_SUCCESS:
    case ProjectTypes.GET_PROJECTS_FAILURE:
      return false;
    default:
      return state;
  }
};

const projectOrder = (project, order = 'asc') => {
  if (order === 'asc') {
    return project.sort( (a,b) => {
      if (new Date(a.startDate) > new Date(b.startDate)) { 
        return -1; 
      } else {
        return 1; 
      }
    });    
  } else {
    return project.sort( (a,b) => {
      if (new Date(a.startDate) < new Date(b.startDate)) { 
        return -1; 
      } else {
        return 1; 
      }
    });    
  }
}

const project = (
  state = {},
  action
) => {
  switch (action.type) {
    case ProjectTypes.CREATE_NEW_PROJECT:
      return {
        profile_id: undefined,
        name: undefined,
        description: undefined,
        projectUrl: undefined,
        startDate: undefined,
        endDate: undefined,
        current: undefined,
      }
    case ProjectTypes.CHANGE_PROJECT:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case ProjectTypes.CREATE_PROJECT_SUCCESS:
      return {name: ''};
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
    case ProjectTypes.GET_PROJECTS_SUCCESS:
      return projectOrder(action.res.data)
    case ProjectTypes.CREATE_PROJECT_SUCCESS:
      const newSchools = state.concat(action.data);
      return projectOrder(newSchools)
    case ProjectTypes.CHANGE_PROJECTS:
      updatedProject = [...state]
      updatedProject[_.findIndex(updatedProject, {_id: action.state.id})][action.state.field] = updatedProject[_.findIndex(updatedProject, {_id: action.state.id})][action.state.field] = action.state.value
      return projectOrder(updatedProject)
    case ProjectTypes.UPDATE_PROJECT_SUCCESS:
      updatedProject = state.slice()
      updatedProject[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return projectOrder(updatedProject)
    case ProjectTypes.DELETE_PROJECT_SUCCESS:
      const newState = state.slice();
      return newState.filter( j => {
        return j._id !== action.data.id;
      })
    case ProjectTypes.CREATE_PROJECT_REQUEST:
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
    case ProjectTypes.TOGGLE_PROJECT_ADD:
      return !action.data
    default:
      return state;
  }
};

const projectReducer = combineReducers({
  project,
  projects,
  addShow,
  isFetching
});

export default projectReducer;
