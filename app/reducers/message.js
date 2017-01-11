import {
  UserTypes,
  SkillTypes,
  LanguageTypes,
  MessageTypes,
  ProfileTypes,
  JobTypes,
  SchoolTypes
} from 'types';
import {
  combineReducers
} from 'redux';

const message = (
  state = {
    message: '',
    type: 'SUCCESS'
  }, action
) => {
  switch (action.type) {
    case UserTypes.LOGIN_SUCCESS_USER:
    case UserTypes.SIGNUP_SUCCESS_USER:
      return {...state,
        message: action.message,
        type: 'SUCCESS'
      };
    case MessageTypes.DISMISS_MESSAGE:
    case SkillTypes.TOGGLE_SKILL_ADD:
      return {...state,
        message: '',
        type: 'SUCCESS'
      };
    case ProfileTypes.GET_PROFILE_FAILURE:
    case JobTypes.GET_JOBS_FAILURE:
    case LanguageTypes.GET_LANGUAGES_FAILURE:
    case SchoolTypes.GET_SCHOOLS_FAILURE:
    case SchoolTypes.CREATE_SCHOOL_FAILURE:
      let msg;
      if (action.error) msg = action.error.toString();
      if (action.error.response && action.error.response.data.error) msg = action.error.response.data.error;
      return {...state,
        message: msg,
        type: "SUCCESS"
      }
    case MessageTypes.CREATE_ERROR:
      return {...state,
        message: action.data,
        type: "ERROR"
      }
    default:
      return state;
  }
}

const errorMessage = (
  state = '',
  action
) => {
  switch (action.type) {
    case MessageTypes.DISMISS_ERROR:
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