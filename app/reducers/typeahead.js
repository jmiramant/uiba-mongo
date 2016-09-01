import { combineReducers } from 'redux';
import * as types from 'types';

const typeahead = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.UPDATE_RESULTS_SUCCESS:
      return action.results
    default:
      return [];
  } 
};


const selection = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.SET_INITIAL_SELECTION:
      return (action.selection ? action.selection : '')
    case types.UPDATE_SELECTION:
      return action.selection
    default:
      return state;
  } 
};

const topicReducer = combineReducers({
  typeahead,
  selection
});

export default topicReducer;