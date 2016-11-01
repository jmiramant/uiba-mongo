import request from 'axios';
import { polyfill } from 'es6-promise';

import * as types from 'types';

function makeCompaniesRequest(method, data, api = '/companies') {
  return request[method](api, data);
}

export function fetchCompanyRequest(companyName) {
  return {
    type: types.GET_COMPANY,
    promise: makeCompaniesRequest('get', {}, '/companies/' + companyName)
  };
}

export function fetchCompanySuccess(data) {
  return {
    type: types.GET_COMPANY_SUCCESS,
    data: data
  };
}


export function fetchCompanyFailure(data) {
  return {
    type: types.GET_COMPANY_FAILURE,
    data: data.error
  };
}

export function fetchCompany(companyName) {
 
  return (dispatch) => {

    const uri = companyName ? ('/company/' + companyName) : ('/company')

    return makeCompaniesRequest('get', {}, uri)
      .then(res => {
        if (res.status === 200) {
          return dispatch(fetchCompanySuccess(res.data));
        }
      })
      .catch((err) => {
        return dispatch(fetchCompanyFailure(err));
      });
  }

}

export function newCompany() {
  return {
    type: types.NEW_COMPANY,
  };
}

export function companyChange(state) {
  return {
    type: types.CHANGE_COMPANY,
    state
  };
}

export function toggleCompanyAdd (data) {
  return {
    type: types.TOGGLE_COMPANY_ADD,
    data: data
  };
}

export function createCompanyRequest(data) {
  return {
    type: types.CREATE_COMPANY,
    data: data
  };
}

export function createCompanySuccess(data) {
  return {
    type: types.CREATE_COMPANY_SUCCESS,
    data: data
  };
}

export function createCompanyFailure(data) {
  return {
    type: types.CREATE_COMPANY_FAILURE,
    error: data.error
  };
}

export function updateCompanyRequest(data) {
  return {
    type: types.UPDATE_COMPANY,
    data: data
  }
}

export function updateCompanySuccess(data) {
  return {
    type: types.UPDATE_COMPANY_SUCCESS,
    data: data
  }
}

export function updateCompanyFailure(data) {
  return {
    type: types.UPDATE_COMPANY_FAILURE,
    error: data.error
  };
}

export function createCompany(companyData) {
  return (dispatch) => {
    dispatch(createCompanyRequest(companyData));
    
    return makeCompanysRequest('post', companyData, '/companys')
      .then(res => {
        if (res.status === 200) {
          return dispatch(createCompanySuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(createCompanyFailure({ error: 'Oops! Something went wrong and we couldn\'t create your company.'}));
      });
  }
}

export function updateCompany(companyData) {
  return (dispatch) => {

    dispatch(updateCompanyRequest(companyData));
    
    return makeCompanysRequest('put', companyData, '/companys')
      .then(res => {
        if (res.status === 200) {
          return dispatch(updateCompanySuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(updateCompanyFailure({ error: 'Oops! Something went wrong and we couldn\'t create your company.'}));
      });
  }

}

export function deleteCompanyRequest (data) {
  return {
    type: types.DELETE_COMPANY_REQUEST,
    data: data
  }
}

export function deleteCompanySuccess (data) {
  return {
    type: types.DELETE_COMPANY_SUCCESS,
    data: data
  }
}

export function deleteCompanyFailure (data) {
  return {
    type: types.DELETE_COMPANY_FAILURE,
    error: data.error
  }
}

export function deleteCompany(company) {
  return (dispatch) => {

    dispatch(deleteCompanyRequest(company));

    return makeCompanysRequest('delete', company, '/companys/' + company._id)
      .then(res => {
        if (res.status === 200) {
          return dispatch(deleteCompanySuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(deleteCompanyFailure({ error: 'Oops! Something went wrong and we couldn\'t delete your company.'}));
      });
  }

}

export function setTypeaheadData(selection) {
  return {
    type: types.UPDATE_COMPANY_SELECTION,
    selection
  };
}


export function setInitialTypeaheadData(selection) {
  return {
    type: types.SET_INITIAL_COMPANY_SELECTION,
    selection
  };
}

export function updateTypeahead(results) {
  return {
    type: types.UPDATE_COMPANY_TYPEAHEAD_SUCCESS,
    results
  };
}

export function fetchTypeaheadData(searchTerm) {
  const apiUrl = "/companies/typeahead" + "?search=" + searchTerm.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ').join('_')
  
  return dispatch => {

    makeCompaniesRequest('get', null,  apiUrl)
      .then(response => {
        dispatch(updateTypeahead(response.data))
      });
  }
}

export function setCompanyFromTypeahead(company) {
  return {
    type: types.SET_COMPANY_FROM_TYPEAHEAD,
    company
  }
}