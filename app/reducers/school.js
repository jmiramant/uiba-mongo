import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const schoolOrder = (school, order = 'asc') => {
  if (order === 'asc') {
    return school.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  } else {
    return school.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  }
}

const schools = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_SCHOOLS_SUCCESS:
      return schoolOrder(action.res.data)
    case types.CREATE_SCHOOL_SUCCESS:
      const newSchools = state.concat(action.data);
      return schoolOrder(newSchools)
    case types.UPDATE_SCHOOL_SUCCESS:
      const updatedSchool = state.slice()
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

// const message = (
//   state = '',
//   action
// ) => {
//   switch (action.type) {
//     case types.DELETE_SCHOOL_SUCCESS:
//     case types.DELETE_SCHOOL_FAILURE:
//       return action.message;
//     default:
//       return state;
//   }
// };

const schoolReducer = combineReducers({
  schools,
});

export default schoolReducer;
