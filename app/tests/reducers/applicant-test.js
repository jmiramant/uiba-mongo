import expect from 'expect';
import reducer from 'reducers/applicant';
import * as types from 'types';

describe('Applicant reducer', () => {
  
  const initialState = {
    filters: {
      name: undefined,
      school: [],
      skill: [],
      address: {},
      score: {min: undefined, max: undefined}
    },
    applicant: {},
    applicants: [],
    skillFilter: {},
    skillsFilter: [],
    showSkillAdd: false,
    educationFilter: []
  };


  const applicant1 = { __v: 0,
    _id: "58656e8e2fedbebe5d67a8c4",
    apply: {},
    childUpdatedAt: "2016-12-29T20:17:14.956Z",
    claim: false,
    createdAt: "2016-12-29T20:14:06.656Z",
    email: "2wq@gmail.co",
    firstName: "qwe",
    gender: "",
    headline: "",
    lastName: "qwe",
    location: "",
    name: "qwe qwe",
    picture: "",
    service: "email",
    updatedAt: "2016-12-29T20:14:06.656Z",
    user_id: "58656e8e2fedbebe5d67a8c3",
    website: ""
  };

  const applicant2 = { __v: 0,
    _id: "58656e8e2fedsebe5d67a8c4",
    apply: {},
    childUpdatedAt: "2016-12-29T20:17:24.956Z",
    claim: false,
    createdAt: "2016-11-29T20:14:06.656Z",
    email: "masd@gmail.co",
    firstName: "kcsal",
    gender: "",
    headline: "",
    lastName: "kcsal",
    location: "",
    name: "kcsal kcsal",
    picture: "",
    service: "email",
    updatedAt: "2016-12-29T20:14:06.656Z",
    user_id: "58656e8asdfedbebe5d67a8c3",
    website: ""
  };

  const applicants = [applicant1, applicant2];

  // it('Should return the initial state', () => {
  //   expect(
  //     reducer(undefined, initialState)
  //   ).toEqual(initialState);
  // });

  it('should handle GET_APPLICANT', () => {
    expect(
      reducer(undefined, {
        type: types.GET_APPLICANT
      })
    ).toEqual(Object.assign({}, initialState));
  });

  it('should handle GET_APPLICANT_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.GET_APPLICANT_SUCCESS,
        res: {data: applicant1 }
      })
    ).toEqual(Object.assign({}, initialState, {applicant: applicant1}));
  });
  
  it('should handle GET_APPLICANT_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: types.GET_APPLICANT_FAILURE
      })
    ).toEqual(Object.assign({}, initialState));
  });

  it('should handle GET_APPLICANT_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: types.GET_APPLICANTS
      })
    ).toEqual(Object.assign({}, initialState));
  });

  it('should handle GET_APPLICANT_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.GET_APPLICANT_SUCCESS,
        res: { data: {applicants: applicants} }
      })
    ).toEqual(Object.assign({}, initialState, {applicants: applicants}));
  });



});



  // it('should handle LOGIN_SUCCESS_USER', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: types.LOGIN_SUCCESS_USER
  //     })
  //   ).toEqual(Object.assign({}, initialState, {
  //     isWaiting: false,
  //     authenticated: true,
  //     message: ''
  //   }));
  // });

  // it('should handle LOGIN_ERROR_USER', () => {
  //   const message = 'Success';
  //   expect(
  //     reducer(undefined, {
  //       type: types.LOGIN_ERROR_USER,
  //       message
  //     })
  //   ).toEqual(Object.assign({}, initialState, {
  //     isWaiting: false,
  //     authenticated: false,
  //     message
  //   }));
  // });

  // it('should handle SIGNUP_USER', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: types.SIGNUP_USER
  //     })
  //   ).toEqual(Object.assign({}, initialState, {
  //     isWaiting: true,
  //     message: ''
  //   }));
  // });

  // it('should handle SIGNUP_SUCCESS_USER', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: types.SIGNUP_SUCCESS_USER
  //     })
  //   ).toEqual(Object.assign({}, initialState, {
  //     isWaiting: false,
  //     authenticated: false
  //   }));
  // });

  // it('should handle SIGNUP_ERROR_USER', () => {
  //   const message = 'Oops! Something went wrong!';
  //   expect(
  //     reducer(undefined, {
  //       type: types.SIGNUP_ERROR_USER,
  //       message
  //     })
  //   ).toEqual(Object.assign({}, initialState, {
  //     isWaiting: false,
  //     authenticated: false,
  //     message
  //   }));
  // });

  // it('should handle LOGOUT_USER', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: types.LOGOUT_USER
  //     })
  //   ).toEqual(Object.assign({}, initialState, {
  //     isWaiting: true,
  //     message: ''
  //   }));
  // });

  // it('should handle LOGOUT_SUCCESS_USER', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: types.LOGOUT_SUCCESS_USER
  //     })
  //   ).toEqual(Object.assign({}, initialState, {
  //     isWaiting: false,
  //     authenticated: false
  //   }));
  // });

  // it('should handle LOGOUT_ERROR_USER', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: types.LOGOUT_ERROR_USER
  //     })
  //   ).toEqual(Object.assign({}, initialState, {
  //     isWaiting: false,
  //     authenticated: true,
  //     isLogin: true
  //   }));
  // });


// export const GET_APPLICANTS = 'GET_APPLICANTS';
// export const GET_APPLICANTS_REQUEST = 'GET_APPLICANTS_REQUEST';
// export const GET_APPLICANTS_SUCCESS = 'GET_APPLICANTS_SUCCESS';
// export const GET_APPLICANTS_FAILURE = 'GET_APPLICANTS_FAILURE';

// export const TOGGLE_APPLICANT_FILTER_SKILL_ADD = 'TOGGLE_APPLICANT_FILTER_SKILL_ADD';
// export const CHANGE_APPLICANT_FILTER_SKILL = 'CHANGE_APPLICANT_FILTER_SKILL';

// export const NEW_APPLICANT_FILTER_SKILL = 'NEW_APPLICANT_FILTER_SKILL';
// export const CHANGE_APPLICANT_FILTER_SKILLS = 'CHANGE_APPLICANT_FILTER_SKILLS';

// export const UPDATE_APPLICANT_FILTERS = 'UPDATE_APPLICANT_FILTERS';

// export const GET_APPLICANT_FILTER_SKILLS = 'GET_APPLICANT_FILTER_SKILLS';
// export const GET_APPLICANT_FILTER_SKILLS_REQUEST = 'GET_APPLICANT_FILTER_SKILLS_REQUEST';
// export const GET_APPLICANT_FILTER_SKILLS_SUCCESS = 'GET_APPLICANT_FILTER_SKILLS_SUCCESS';
// export const GET_APPLICANT_FILTER_SKILLS_FAILURE = 'GET_APPLICANT_FILTER_SKILLS_FAILURE';

// export const CREATE_APPLICANT_FILTER_SKILL = 'CREATE_APPLICANT_FILTER_SKILL';
// export const CREATE_APPLICANT_FILTER_SKILL_REQUEST = 'CREATE_APPLICANT_FILTER_SKILL_REQUEST';
// export const CREATE_APPLICANT_FILTER_SKILL_SUCCESS = 'CREATE_APPLICANT_FILTER_SKILL_SUCCESS';
// export const CREATE_APPLICANT_FILTER_SKILL_FAILURE = 'CREATE_APPLICANT_FILTER_SKILL_FAILURE';

// export const UPDATE_APPLICANT_FILTER_SKILL = 'UPDATE_APPLICANT_FILTER_SKILL';
// export const UPDATE_APPLICANT_FILTER_SKILL_REQUEST = 'UPDATE_APPLICANT_FILTER_SKILL_REQUEST';
// export const UPDATE_APPLICANT_FILTER_SKILL_SUCCESS = 'UPDATE_APPLICANT_FILTER_SKILL_SUCCESS';
// export const UPDATE_APPLICANT_FILTER_SKILL_FAILURE = 'UPDATE_APPLICANT_FILTER_SKILL_FAILURE';

// export const DELETE_APPLICANT_FILTER_SKILL = 'DELETE_APPLICANT_FILTER_SKILL';
// export const DELETE_APPLICANT_FILTER_SKILL_REQUEST = 'DELETE_APPLICANT_FILTER_SKILL_REQUEST';
// export const DELETE_APPLICANT_FILTER_SKILL_SUCCESS = 'DELETE_APPLICANT_FILTER_SKILL_SUCCESS';
// export const DELETE_APPLICANT_FILTER_SKILL_FAILURE = 'DELETE_APPLICANT_FILTER_SKILL_FAILURE';

// export const TOGGLE_APPLICANT_EDU_FILTER = 'TOGGLE_APPLICANT_EDU_FILTER';

// export const APPLICANT_FILTER_CLEAR = 'APPLICANT_FILTER_CLEAR';
// export const APPLICANT_FILTER_CHANGE = 'APPLICANT_FILTER_CHANGE';
// export const APPLICANT_FILTER_REMOVE = 'APPLICANT_FILTER_REMOVE';