import * as types from 'types';
import {
  combineReducers
} from 'redux';
import _ from 'lodash';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.GET_ROLES_REQUEST:
      return true;
    case types.GET_ROLES_SUCCESS:
    case types.GET_ROLES_FAILURE:
      return false;
    default:
      return state;
  }
};

const roleOrder = (roles, order = 'asc') => {
  return roles.sort((a, b) => {
    if (new Date(a.createdAt) > new Date(b.createdAt)) {
      return -1;
    } else {
      return 1;
    }
  });
}

const role = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_NEW_ROLE:
      return state;
    case types.CHANGE_ROLE:
      const newStateOjb = {...state
      }
      newStateOjb[action.state.field] = action.state.value
      return newStateOjb;
    case types.CREATE_ROLE_SUCCESS:
      return {
        company_id: undefined,
        address_id: undefined,
        title: undefined,
        description: undefined,
        applicantCode: undefined,
        degreeMin: undefined,
        degreeMax: undefined,
        experienceMin: undefined,
        experienceMin: undefined,
        appliedCount: undefined
      };
    default:
      return state;
  }
};

const roles = (
  state = [],
  action
) => {
  let updatedRole;
  switch (action.type) {
    case types.GET_ROLES_SUCCESS:
      return roleOrder(action.res.data)
    case types.CREATE_ROLE_SUCCESS:
      const newRoles = state.concat(action.data);
      return roleOrder(newRoles)
    case types.CHANGE_ROLES:
      updatedRole = [...state]
      updatedRole[_.findIndex(updatedRole, {
        _id: action.state.id
      })][action.state.field] = updatedRole[_.findIndex(updatedRole, {
        _id: action.state.id
      })][action.state.field] = action.state.value
      return roleOrder(updatedRole)
    case types.UPDATE_ROLE_SUCCESS:
      updatedRole = state.slice()
      updatedRole[_.findIndex(state, function(j) {
        return j._id === action.data._id;
      })] = action.data
      return roleOrder(updatedRole)
    case types.DELETE_ROLE_SUCCESS:
      const newState = state.slice();
      return newState.filter(j => {
        return j._id !== action.data.id;
      })
    case types.CREATE_ROLE_REQUEST:
      return {
        data: action.res.data,
      };
    default:
      return state;
  }
};


const addShow = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_ROLE_ADD:
      return !action.data
    default:
      return state;
  }
};

const roleReducer = combineReducers({
  isFetching,
  role,
  roles,
  addShow,
});

export default roleReducer;