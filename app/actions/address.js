import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from 'types';

polyfill();

export function toggleAddressEdit () {
  return {
    type: types.TOGGLE_ADDRESS_EDIT
  };
}

export function showAddressEditIcon () {
  return {
    type: types.SHOW_ADDRESS_EDIT_ICON
  };
}

export function hideAddressEditIcon (data) {
  return {
    type: types.HIDE_ADDRESS_EDIT_ICON,
    data: data
  };
}

export function updateAddressAutofill(results) {
  return {
    type: types.UPDATE_ADDRESS_AUTOFILL_SUCCESS,
    results
  };
}

export function makeAddressRequest(method, data, api = '/address') {
  return request[method](api, data);
}


export function fetchAddressByZip(zipcode) {
  const apiUrl = "/address/autofill?search=" + zipcode
  return dispatch => {
    makeAddressRequest('get', null,  apiUrl)
      .then(response => {
        dispatch(updateAddressAutofill(response))
      });
  }
}

export function fetchAddress() {
  return {
    type: types.GET_ADDRESS,
    promise: makeAddressRequest('get', {}, '/address/me')
  };
}

export function createAddressRequest(data) {
  return {
    type: types.CREATE_ADDRESS,
    data: data
  };
}

export function createAddressSuccess(data) {
  return {
    type: types.CREATE_ADDRESS_SUCCESS,
    data: data
  };
}

export function createAddressFailure(data) {
  return {
    type: types.CREATE_ADDRESS_FAILURE,
    error: data.error
  };
}

export function updateAddressRequest(data) {
  return {
    type: types.UPDATE_ADDRESS,
    data: data
  }
}

export function updateAddressSuccess(data) {
  return {
    type: types.UPDATE_ADDRESS_SUCCESS,
    data: data
  }
}

export function updateAddressFailure(data) {
  return {
    type: types.UPDATE_ADDRESS_FAILURE,
    error: data.error
  };
}

export function createAddress(addressData) {
  return (dispatch) => {
    dispatch(createAddressRequest(addressData));
    
    return makeAddressRequest('post', addressData, '/address')
      .then(res => {
        if (res.status === 200) {
          return dispatch(createAddressSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(createAddressFailure({ error: 'Oops! Something went wrong and we couldn\'t create your address.'}));
      });
  }
}

export function updateAddress(addressData) {
  return (dispatch) => {

    dispatch(updateAddressRequest(addressData));
    
    return makeAddressRequest('put', addressData, '/address')
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateAddressSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(updateAddressFailure({ error: 'Oops! Something went wrong and we couldn\'t create your address.'}));
      });
  }

}

export function deleteAddressRequest (data) {
  return {
    type: types.DELETE_ADDRESS_REQUEST,
    data: data
  }
}

export function deleteAddressSuccess (data) {
  return {
    type: types.DELETE_ADDRESS_SUCCESS,
    data: data
  }
}

export function deleteAddressFailure (data) {
  return {
    type: types.DELETE_ADDRESS_FAILURE,
    error: data.error
  }
}

export function deleteAddress(address) {
  return (dispatch) => {

    dispatch(deleteAddressRequest(address));

    return makeAddressRequest('delete', address, '/address/' + address._id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteAddressSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(deleteAddressFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your address.'}));
      });
  }

}