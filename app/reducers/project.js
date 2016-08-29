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

const projects = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_PROJECTS_SUCCESS:
      return projectOrder(action.res.data)
    case types.CREATE_PROJECT_SUCCESS:
      const newSchools = state.concat(action.data);
      return projectOrder(newSchools)
    case types.UPDATE_PROJECT_SUCCESS:
      const updatedSchool = state.slice()
      updatedSchool[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return projectOrder(updatedSchool)
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

const projectReducer = combineReducers({
  projects,
});

export default projectReducer;
