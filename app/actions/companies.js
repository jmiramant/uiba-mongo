import request from 'axios';
import { polyfill } from 'es6-promise';

import { CompanyTypes } from 'types';

function makeCompaniesRequest(method, data, api = '/companies') {
  return request[method](api, data);
}

export function fetchCompanySuccess(data) {
  return {
    type: CompanyTypes.GET_COMPANY_SUCCESS,
    data: data
  };
}


export function fetchCompanyFailure(data) {
  return {
    type: CompanyTypes.GET_COMPANY_FAILURE,
    data: data.error
  };
}

export function fetchCompanyRequest() {
  return {
    type: CompanyTypes.GET_COMPANY_REQUEST
  };
}

export function fetchCompany(id) {
 
  return (dispatch) => {

    const uri = id ? ('/company/' + id) : ('/company')

    dispatch(fetchCompanyRequest())
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
    type: CompanyTypes.NEW_COMPANY,
  };
}

export function companyChange(state) {
  return {
    type: CompanyTypes.CHANGE_COMPANY,
    state
  };
}

export function toggleCompanyAdd (data) {
  return {
    type: CompanyTypes.TOGGLE_COMPANY_ADD,
    data: data
  };
}

export function createCompanyRequest(data) {
  return {
    type: CompanyTypes.CREATE_COMPANY,
    data: data
  };
}

export function createCompanySuccess(data) {
  return {
    type: CompanyTypes.CREATE_COMPANY_SUCCESS,
    data: data
  };
}

export function createCompanyFailure(data) {
  return {
    type: CompanyTypes.CREATE_COMPANY_FAILURE,
    error: data.error
  };
}

export function updateCompanyRequest(data) {
  return {
    type: CompanyTypes.UPDATE_COMPANY,
    data: data
  }
}

export function updateCompanySuccess(data) {
  return {
    type: CompanyTypes.UPDATE_COMPANY_SUCCESS,
    data: data
  }
}

export function updateCompanyFailure(data) {
  return {
    type: CompanyTypes.UPDATE_COMPANY_FAILURE,
    error: data.error
  };
}

export function createCompany(companyData) {
  return (dispatch) => {
    dispatch(createCompanyRequest(companyData));
    
    return makeCompaniesRequest('post', companyData, '/company')
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
    
    return makeCompaniesRequest('put', companyData, '/company')
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
    type: CompanyTypes.DELETE_COMPANY_REQUEST,
    data: data
  }
}

export function deleteCompanySuccess (data) {
  return {
    type: CompanyTypes.DELETE_COMPANY_SUCCESS,
    data: data
  }
}

export function deleteCompanyFailure (data) {
  return {
    type: CompanyTypes.DELETE_COMPANY_FAILURE,
    error: data.error
  }
}

export function deleteCompany(company) {
  return (dispatch) => {

    dispatch(deleteCompanyRequest(company));

    return makeCompaniesRequest('delete', company, '/company/' + company._id)
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
    type: CompanyTypes.UPDATE_COMPANY_SELECTION,
    selection
  };
}


export function setInitialTypeaheadData(selection) {
  return {
    type: CompanyTypes.SET_INITIAL_COMPANY_SELECTION,
    selection
  };
}

export function updateTypeahead(results) {
  return {
    type: CompanyTypes.UPDATE_COMPANY_TYPEAHEAD_SUCCESS,
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
    type: CompanyTypes.SET_COMPANY_FROM_TYPEAHEAD,
    company
  }
}