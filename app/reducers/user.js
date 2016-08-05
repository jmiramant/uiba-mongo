import * as types from 'types';
import { combineReducers } from 'redux';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_USERS_REQUEST:
      return true;
    case types.GET_USERS_SUCCESS:
    case types.GET_USERS_FAILURE:
      return false;
    default:
      return state;
  }
};

const currentUser = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_CURRENT_USERS:
      debugger
      return action.res.data;
    case types.GET_CURRENT_USERS_REQUEST:
      return [...state, USER(undefined, action)];
    case types.GET_CURRENT_USERS_FAILURE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  isLogin,
  isWaiting,
  authenticated,
  message
});

export default userReducer;
