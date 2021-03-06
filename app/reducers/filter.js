import { FilterTypes } from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case FilterTypes.GET_FILTERS_REQUEST:
      return true;
    case FilterTypes.GET_FILTERS_SUCCESS:
    case FilterTypes.GET_FILTERS_FAILURE:
      return false;
    default:
      return state;
  }
};

const filterOrder = (filter, order = 'asc') => {
  if (order === 'asc') {
    return filter.sort( (a,b) => {
      if (new Date(a.createdDate) > new Date(b.createdDate)) {
        return -1; 
      } else {
        return 1; 
      }
    });    
  } else {
    return filter.sort( (a,b) => {
      if (new Date(a.createdDate) < new Date(b.createdDate)) {
        return -1; 
      } else {
        return 1; 
      }
    });    
  }
}

const filter = (
  state = {},
  action
) => {
  switch (action.type) {
    case FilterTypes.CREATE_NEW_FILTER:
      return {
        profile_id: undefined,
        role_id: undefined,
        school: undefined,
        skill: undefined,
        address: undefined,
        score: undefined
      }
    case FilterTypes.CHANGE_FILTER:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case FilterTypes.CREATE_FILTER_SUCCESS:
      return {};
    default:
      return state;
  }
};

const filters = (
  state = [],
  action
) => {
  let updatedSchool;
  switch (action.type) {
    case FilterTypes.GET_FILTERS_SUCCESS:
      return filterOrder(action.res.data)
    case FilterTypes.CREATE_FILTER_SUCCESS:
      const newSchools = state.concat(action.data);
      return filterOrder(newSchools)
    case FilterTypes.CHANGE_FILTERS:
      updatedSchool = [...state]
      updatedSchool[_.findIndex(updatedSchool, {_id: action.state.id})][action.state.field] = updatedSchool[_.findIndex(updatedSchool, {_id: action.state.id})][action.state.field] = action.state.value
      return filterOrder(updatedSchool)
    case FilterTypes.DELETE_FILTER_SUCCESS:
      const newState = [...state];
      return newState.filter( j => {
        return j._id !== action.data.id;
      });
    case FilterTypes.CREATE_FILTER_REQUEST:
      return {
        data: action.res.data,
      };
    default:
      return state;
  }
};

const filterReducer = combineReducers({
  filter,
  filters,
  isFetching,
});

export default filterReducer;
