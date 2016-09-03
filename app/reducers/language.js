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

const language = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_NEW_LANGUAGE:
      return {
        profile_id: undefined,
        language: undefined,
        proficiency: undefined,
        experience: undefined,
      }
    case types.CREATE_LANGUAGE_SUCCESS:
      return {};
    case types.CHANGE_LANGUAGE:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    default:
      return state;
  }
};

const languages = (
  state = [],
  action
) => {
  let updatedLangauge;
  switch (action.type) {
    case types.GET_LANGUAGES_SUCCESS:
      return languageOrder(action.res.data)
    case types.CREATE_LANGUAGE_SUCCESS:
      const newLangauges = state.concat(action.data);
      return languageOrder(newLangauges)
    case types.CHANGE_LANGUAGES:
      updatedLangauge = [...state]
      updatedLangauge[_.findIndex(updatedLangauge, {_id: action.state.id})][action.state.field] = updatedLangauge[_.findIndex(updatedLangauge, {_id: action.state.id})][action.state.field] = action.state.value
      return updatedLangauge
    case types.UPDATE_LANGUAGE_SUCCESS:
      updatedLangauge = state.slice()
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

const addShow = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LANGUAGE_ADD:
      return !action.data
    default:
      return state;
  }
};

const languageReducer = combineReducers({
  language,
  languages,
  addShow,
});

export default languageReducer;
