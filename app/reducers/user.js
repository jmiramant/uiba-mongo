import * as types from 'types';
import { combineReducers } from 'redux';
import { indentifyUser, setUser } from 'middlewares/mixpanelTrackers';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_USERS_SUCCESS:
    case types.GET_USERS_FAILURE:
      return false;
    default:
      return state;
  }
};

const currentUser = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.GET_CURRENT_USER_SUCCESS:
      indentifyUser(action.res.data.email);
      setUser(action.res.data.email, action.res.data);
      return action.res.data;
    case types.LOGIN_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
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
      let resp = !state;
      if (!action.isLogin.type) { 
        resp = (action.isLogin === 'true') ? true : false 
      }
      return resp;
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
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  isFetching,
  currentUser,
  isLogin,
  isWaiting,
  authenticated,
  message
});

export default userReducer;
