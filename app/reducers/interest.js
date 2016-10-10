import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_INTERESTS_REQUEST:
      return true;
    case types.GET_INTERESTS_SUCCESS:
    case types.GET_INTERESTS_FAILURE:
      return false;
    default:
      return state;
  }
};

const interestOrder = (interest, order = 'asc') => {
  if (order === 'asc') {
    return interest.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  } else {
    return interest.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  }
}

const interest = (
  state = {
    profile_id: undefined,
    interest: undefined,
  },
  action
) => {
  switch (action.type) {
    case types.CREATE_NEW_INTEREST:
      return state;
    case types.CREATE_INTEREST_SUCCESS:
    case types.CREATE_INTEREST_FAILURE:
      return {};
    case types.TOGGLE_INTEREST_ADD:
      if (!action.data && action.persist) {
        return action.persist
      } else {
        return {};
      }
    case types.CHANGE_INTEREST:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    default:
      return state;
  }
};

const interests = (
  state = [],
  action
) => {
  let updatedInterest;
  switch (action.type) {
    case types.GET_INTERESTS_SUCCESS:
      return interestOrder(action.res.data)
    case types.CREATE_INTEREST_SUCCESS:
      const newInterests = state.concat(action.data);
      return interestOrder(newInterests)
    case types.CHANGE_INTERESTS:
      updatedInterest = [...state]
      updatedInterest[_.findIndex(updatedInterest, {_id: action.state.id})][action.state.field] = updatedInterest[_.findIndex(updatedInterest, {_id: action.state.id})][action.state.field] = action.state.value
      return updatedInterest
    case types.UPDATE_INTEREST_SUCCESS:
      updatedInterest = state.slice()
      updatedInterest[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return interestOrder(updatedInterest)
    case types.DELETE_INTEREST_SUCCESS:
      const newState = state.slice();
      return newState.filter( j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_INTEREST_REQUEST:
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
    case types.TOGGLE_INTEREST_ADD:
      return !action.data
    default:
      return state;
  }
};

const errorMessage = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.CREATE_INTEREST_FAILURE:
      return action.error
    case types.DISMISS_INTEREST_ERROR:
      return ''
    default:
      return state;
  }
};

const interestReducer = combineReducers({
  interest,
  interests,
  errorMessage,
  addShow,
  isFetching
});

export default interestReducer;
