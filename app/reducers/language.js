import * as types from 'types';
import { combineReducers } from 'redux';
import _ from 'lodash';

const languageOrder = (language, order = 'asc') => {
  if (order === 'asc') {
    return language.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  } else {
    return language.sort( (a,b) => {
      return new Date(a.startDate) < new Date(b.startDate)
    });    
  }
}

const languages = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_LANGUAGES_SUCCESS:
      return languageOrder(action.res.data)
    case types.CREATE_LANGUAGE_SUCCESS:
      const newLangauges = state.concat(action.data);
      return languageOrder(newLangauges)
    case types.UPDATE_LANGUAGE_SUCCESS:
      const updatedLangauge = state.slice()
      updatedLangauge[_.findIndex(state, function(j) { return j._id === action.data._id; })] = action.data
      return languageOrder(updatedLangauge)
    case types.DELETE_LANGUAGE_SUCCESS:
      const newState = state.slice();
      return newState.filter( j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_LANGUAGE_REQUEST:
      return {
        data: action.res.data,
      };
    default:
      return state;
  }
};

const languageReducer = combineReducers({
  languages,
});

export default languageReducer;
