import { UserTypes } from 'types';
import { combineReducers } from 'redux';
import { indentifyUser, setUser } from 'middlewares/mixpanelTrackers';
import { SIBIdentifyAndSignIn, SIBsignIn } from 'middlewares/sendInBlueEvents';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case UserTypes.GET_USERS_SUCCESS:
    case UserTypes.GET_USERS_FAILURE:
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
    case UserTypes.GET_CURRENT_USER_SUCCESS:
      indentifyUser(action.res.data.email);
      setUser(action.res.data.email, action.res.data);
      return action.res.data;
    case UserTypes.LOGIN_SUCCESS_USER:
      SIBsignIn(action.user);
      return action.user;
    case UserTypes.LOGOUT_ERROR_USER:
    case UserTypes.LOGIN_ERROR_USER:
    case UserTypes.SIGNUP_ERROR_USER:
    case UserTypes.LOGOUT_SUCCESS_USER:
      return {};
    case UserTypes.SIGNUP_SUCCESS_USER:
      SIBIdentifyAndSignIn(action.profile, action.user)
      return {};
    default:
      return state;
  }
};

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case UserTypes.TOGGLE_LOGIN_MODE:
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
    case UserTypes.TOGGLE_LOGIN_MODE:
    case UserTypes.MANUAL_LOGIN_USER:
    case UserTypes.SIGNUP_USER:
    case UserTypes.LOGOUT_USER:
    case UserTypes.LOGIN_SUCCESS_USER:
    case UserTypes.SIGNUP_SUCCESS_USER:
      return '';
    case UserTypes.LOGIN_ERROR_USER:
    case UserTypes.SIGNUP_ERROR_USER:
      if (action.message) {
        return action.message;
      } else {
        return state;
      }
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case UserTypes.MANUAL_LOGIN_USER:
    case UserTypes.SIGNUP_USER:
    case UserTypes.LOGOUT_USER:
      return true;
    case UserTypes.LOGIN_SUCCESS_USER:
    case UserTypes.SIGNUP_SUCCESS_USER:
    case UserTypes.LOGOUT_SUCCESS_USER:
    case UserTypes.LOGIN_ERROR_USER:
    case UserTypes.SIGNUP_ERROR_USER:
    case UserTypes.LOGOUT_ERROR_USER:
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
    case UserTypes.LOGIN_SUCCESS_USER:
    case UserTypes.LOGOUT_ERROR_USER:
      return true;
    case UserTypes.LOGIN_ERROR_USER:
    case UserTypes.SIGNUP_SUCCESS_USER:
    case UserTypes.SIGNUP_ERROR_USER:
    case UserTypes.LOGOUT_SUCCESS_USER:
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
