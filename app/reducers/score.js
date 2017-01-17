import { ScoreTypes } from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case ScoreTypes.GET_SCORES_REQUEST:
      return true;
    case ScoreTypes.GET_SCORES_SUCCESS:
    case ScoreTypes.GET_SCORES_FAILURE:
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
    case ScoreTypes.GET_SCORES_SUCCESS:
      return action.data;
    case ScoreTypes.CLEAR_SCORES:
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