import * as types from 'types';
import { combineReducers } from 'redux';

const message = (
  state = {
  message: '',
  type: 'SUCCESS'
}, action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return {...state, message: action.message, type: 'SUCCESS'};
    case types.DISMISS_MESSAGE:
    case types.TOGGLE_SKILL_ADD:
      return {...state, message: '', type: 'SUCCESS'};
    case types.GET_PROFILE_FAILURE:
    case types.GET_JOBS_FAILURE:
    case types.GET_LANGUAGES_FAILURE:
    case types.GET_SCHOOLS_FAILURE:
    case types.CREATE_SCHOOL_FAILURE:
      let msg;
      if (action.error) msg = action.error.toString();
      if (action.error.response && action.error.response.data.error) msg = action.error.response.data.error;
      return {...state, message: msg, type: "SUCCESS"}
    case types.CREATE_ERROR:
      return {...state, message: action.data, type: "ERROR"}
    default:
      return state;
  }
}

const errorMessage = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.CREATE_SKILL_FAILURE:
    case types.CREATE_LANGUAGE_FAILURE:
      return action.error
    case types.DISMISS_ERROR:
      return ''
    default:
      return state;
  }
};

const messageReducer = combineReducers({
  message,
  errorMessage
});

export default messageReducer;