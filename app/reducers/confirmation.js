import * as types from 'types';
import { combineReducers } from 'redux';

const show = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_RESEND:
      return !action.data;
    case types.CHANGE_CONFIRM_EMAIL:
      return true;
    default:
      return false;
  }
};

const email = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.CHANGE_CONFIRM_EMAIL:
      return action.state;
    case types.RESEND_CONFIRM_FAILURE:
    case types.RESEND_CONFIRM_SUCCESS:
      return '';
    default:
      return state;
  }
};

const resent = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.RESEND_CONFIRM_SUCCESS:
      return true;
    case types.RESEND_CONFIRM_FAILURE:
      return false;
    default:
      return false;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.RESEND_CONFIRM_FAILURE:
      return action.error.message;
    case types.RESEND_CONFIRM_SUCCESS:
      return action.state.message;
    default:
      return state;
  }
};


const confirmationReducer = combineReducers({
  message,
  show,
  email,
  resent
});

export default confirmationReducer;
