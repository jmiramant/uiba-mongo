import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';
import { UserTypes } from 'types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

function makeUserRequest(method, data, api = '/me') {
  return request[method](api, data);
}

// Log In Action Creators
export function beginLogin() {
  return { type: UserTypes.MANUAL_LOGIN_USER };
}

export function loginSuccess(message) {
  return {
    type: UserTypes.LOGIN_SUCCESS_USER,
    message
  };
}

export function loginError(message) {
  return {
    type: UserTypes.LOGIN_ERROR_USER,
    message
  };
}

// Sign Up Action Creators
export function signUpError(message) {
  return {
    type: UserTypes.SIGNUP_ERROR_USER,
    message
  };
}

export function beginSignUp() {
  return { type: UserTypes.SIGNUP_USER };
}

export function signUpSuccess(message) {
  return {
    type: UserTypes.SIGNUP_SUCCESS_USER,
    message
  };
}

// Log Out Action Creators
export function beginLogout() {
  return { type: UserTypes.LOGOUT_USER};
}

export function logoutSuccess() {
  return { type: UserTypes.LOGOUT_SUCCESS_USER };
}

export function logoutError() {
  return { type: UserTypes.LOGOUT_ERROR_USER };
}

export function toggleLoginMode(isLogin) {
  return { 
    type: UserTypes.TOGGLE_LOGIN_MODE,
    isLogin
  };
}

// Fetch all users
export function fetchCurrentUser() {
  return {
    type: UserTypes.GET_CURRENT_USER,
    promise: makeUserRequest('get')
  };
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message));
          dispatch(push('/profile'));
        } else {
          dispatch(loginError({message: 'Oops! Something went wrong!'}));
        }
      })
      .catch(err => {
        dispatch(loginError(getMessage(err)));
      });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    return makeUserRequest('post', data, '/signup')
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message));
          dispatch(push('/email-confirmation'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        let msg = err;
        if (typeof(err) === 'object') msg = err.toString();
        dispatch(signUpError(msg));
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());
    return makeUserRequest('post', null, '/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}
