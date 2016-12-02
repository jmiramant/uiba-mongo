import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_SCORES_REQUEST:
      return true;
    case types.GET_SCORES_SUCCESS:
    case types.GET_SCORES_FAILURE:
      return false;
    default:
      return state;
  }
};

const scores = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_SCORES_SUCCESS:
      return action.data;
    case types.CLEAR_SCORES:
      return [];
    default:
      return state;
  }
};

const scoreReducer = combineReducers({
  isFetching,
  scores,
});

export default scoreReducer;