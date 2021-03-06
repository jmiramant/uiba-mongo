import expect from 'expect';
import reducer from 'reducers/user';
import { UserTypes } from 'types';

describe('Users reducer', () => {
  const initialState = {
    isFetching: false,
    isLogin: true,
    currentUser: {},
    message: '',
    isWaiting: false,
    authenticated: false
  };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {
        authenticated: false,
        currentUser: [],
        isFetching: false,
        isLogin: true,
        isWaiting: false,
        message: ''
      })
    ).toEqual(initialState);
  });

  it('should handle MANUAL_LOGIN_USER', () => {
    expect(
      reducer(undefined, {
        type: UserTypes.MANUAL_LOGIN_USER
      })
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: true,
      message: ''
    }));
  });

  it('should handle LOGIN_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {
        type: UserTypes.LOGIN_SUCCESS_USER
      })
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: true,
      message: ''
    }));
  });

  it('should handle LOGIN_ERROR_USER', () => {
    const message = 'Success';
    expect(
      reducer(undefined, {
        type: UserTypes.LOGIN_ERROR_USER,
        message
      })
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: false,
      message
    }));
  });

  it('should handle SIGNUP_USER', () => {
    expect(
      reducer(undefined, {
        type: UserTypes.SIGNUP_USER
      })
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: true,
      message: ''
    }));
  });

  it('should handle SIGNUP_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {
        type: UserTypes.SIGNUP_SUCCESS_USER
      })
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: false
    }));
  });

  it('should handle SIGNUP_ERROR_USER', () => {
    const message = 'Oops! Something went wrong!';
    expect(
      reducer(undefined, {
        type: UserTypes.SIGNUP_ERROR_USER,
        message
      })
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: false,
      message
    }));
  });

  it('should handle LOGOUT_USER', () => {
    expect(
      reducer(undefined, {
        type: UserTypes.LOGOUT_USER
      })
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: true,
      message: ''
    }));
  });

  it('should handle LOGOUT_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {
        type: UserTypes.LOGOUT_SUCCESS_USER
      })
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: false
    }));
  });

  it('should handle LOGOUT_ERROR_USER', () => {
    expect(
      reducer(undefined, {
        type: UserTypes.LOGOUT_ERROR_USER
      })
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: true,
      isLogin: true
    }));
  });
});