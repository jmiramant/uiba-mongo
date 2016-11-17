import * as types from 'types';
import { combineReducers } from 'redux';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_APPLICANTS_REQUEST:
    case types.GET_APPLICANT_REQUEST:
      return true;
    case types.GET_APPLICANTS_SUCCESS:
    case types.GET_APPLICANT_SUCCESS:
    case types.GET_APPLICANTS_FAILURE:
    case types.GET_APPLICANT_FAILURE:
      return false;
    default:
      return state;
  }
};

const order = (applicants, order = 'asc') => {
  return applicants.sort((a, b) => {
    if (new Date(a.updatedAt) > new Date(b.updatedAt)) {
      return -1;
    } else {
      return 1;
    }
  });
}

const applicant = (
  state = {},
  action
) => {
  let updatedProfile;
  switch (action.type) {
    case types.GET_APPLICANT_SUCCESS:
      return action.res.data;
    case types.CHANGE_APPLICANT:
      const newStateOjb = {...state}
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.GET_APPLICANT_FAILURE:
      return state;
    case types.UPDATE_APPLICANT_SUCCESS:
      return {...state}
    default:
      return state;
  }
};


const applicants = (
  state = [],
  action
) => {
  let updatedApplicants;
  switch (action.type) {
    case types.GET_APPLICANTS_SUCCESS:
      return order(action.res.data)
    case types.CREATE_APPLICANT_SUCCESS:
      const newApplicantss = state.concat(action.data);
      return order(newApplicantss)
    case types.CHANGE_APPLICANTS:
      updatedApplicants = [...state]
      const index = _.findIndex(state, {
        _id: action.state._id
      })
      updatedApplicants[index] = {...updatedApplicants[index], ...action.state}
      return order(updatedApplicants)
    case types.UPDATE_APPLICANT_SUCCESS:
      updatedApplicants = state.slice()
      updatedApplicants[_.findIndex(state, function(j) {
        return j._id === action.data._id;
      })] = action.data
      return order(updatedApplicants)
    case types.DELETE_APPLICANT_SUCCESS:
      const newState = state.slice();
      return newState.filter(j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_APPLICANT_REQUEST:
      return {
        data: action.res.data,
      };
    default:
      return state;
  }
};

const profileReducer = combineReducers({
  isFetching,
  applicant,
  applicants,
});

export default profileReducer;
