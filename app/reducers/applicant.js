import * as types from 'types';
import { combineReducers } from 'redux';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_PROFILE_REQUEST:
      return true;
    case types.GET_PROFILE_SUCCESS:
    case types.GET_PROFILE_FAILURE:
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
  applicants,
});

export default profileReducer;
