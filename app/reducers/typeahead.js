import { combineReducers } from 'redux';
import { TypeaheadTypes } from 'types';

const typeahead = (
  state = [],
  action
) => {
  switch (action.type) {
    case TypeaheadTypes.UPDATE_RESULTS_SUCCESS:
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
    case TypeaheadTypes.SET_INITIAL_SELECTION:
      return (action.selection ? action.selection : '')
    case TypeaheadTypes.UPDATE_SELECTION:
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