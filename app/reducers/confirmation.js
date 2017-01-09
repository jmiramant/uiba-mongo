import { ConfirmationTypes } from 'types';
import { combineReducers } from 'redux';

const show = (
  state = false,
  action
) => {
  switch (action.type) {
    case ConfirmationTypes.TOGGLE_RESEND:
      return !action.data;
    case ConfirmationTypes.CHANGE_CONFIRM_EMAIL:
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
    case ConfirmationTypes.CHANGE_CONFIRM_EMAIL:
      return action.state;
    case ConfirmationTypes.RESEND_CONFIRM_FAILURE:
    case ConfirmationTypes.RESEND_CONFIRM_SUCCESS:
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
    case ConfirmationTypes.RESEND_CONFIRM_SUCCESS:
      return true;
    case ConfirmationTypes.RESEND_CONFIRM_FAILURE:
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
    case ConfirmationTypes.RESEND_CONFIRM_FAILURE:
      return action.error.message;
    case ConfirmationTypes.RESEND_CONFIRM_SUCCESS:
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
