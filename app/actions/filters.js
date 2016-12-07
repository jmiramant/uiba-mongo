import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from 'types';

polyfill();

export function newFilter() {
  return {
    type: types.NEW_FILTER,
  };
}

export function filterChange(state) {
  return {
    type: types.CHANGE_FILTER,
    state
  };
}

export function filtersChange(state) {
  return {
    type: types.CHANGE_FILTERS,
    state
  };
}

export function toggleFilterAdd (data) {
  return {
    type: types.TOGGLE_FILTER_ADD,
    data: data
  };
}

function makeFiltersRequest(method, data, api = '/filters') {
  return request[method](api, data);
}

export function fetchFilters(roleId) {
  return {
    type: types.GET_FILTERS,
    promise: makeFiltersRequest('get', {}, '/filters/' + roleId)
  };
}

export function createFilterRequest(data) {
  return {
    type: types.CREATE_FILTER,
    data: data
  };
}

export function createFilterSuccess(data) {
  return {
    type: types.CREATE_FILTER_SUCCESS,
    data: data
  };
}

export function createFilterFailure(data) {
  return {
    type: types.CREATE_FILTER_FAILURE,
    error: data.error
  };
}

export function createFilter(filterData) {
  return (dispatch) => {
    dispatch(createFilterRequest(filterData));
    
    return makeFiltersRequest('post', filterData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(createFilterSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(createFilterFailure({ error: 'Oops! Something went wrong and we couldn\'t create your filter.'}));
      });
  }
}

export function updateFilter(filterData) {
  return (dispatch) => {

    dispatch(updateFilterRequest(filterData));
    
    return makeFiltersRequest('put', filterData)
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateFilterSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(updateFilterFailure({ error: 'Oops! Something went wrong and we couldn\'t create your filter.'}));
      });
  }

}

export function deleteFilterRequest (data) {
  return {
    type: types.DELETE_FILTER_REQUEST,
    data: data
  }
}

export function deleteFilterSuccess (data) {
  return {
    type: types.DELETE_FILTER_SUCCESS,
    data: data
  }
}

export function deleteFilterFailure (data) {
  return {
    type: types.DELETE_FILTER_FAILURE,
    error: data.error
  }
}

export function deleteFilter(filter) {
  return (dispatch) => {

    dispatch(deleteFilterRequest(filter));

    return makeFiltersRequest('delete', filter, '/filter/' + filter._id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteFilterSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(deleteFilterFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your filter.'}));
      });
  }

}
