/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/schools';
import { SchoolTypes } from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('School Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    const school = 'Node.js';
    const profile_id = md5.hash(school);
    const id = md5.hash(school);
    const data = {
      id,
      profile_id,
      name: 'Josh',
      major: ['asd', 'asdw'],
      minor: ['asd', 'asdw'],
      degree: 'Master',
      startDate: new Date(),
      endDate: new Date(),
      current: false
    };

    const initialState = {
      school: {
        schools: []
      }
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('dispatches request and success actions when status is 200', done => {
      const expectedActions = [
        {
          type: SchoolTypes.CREATE_SCHOOL,
          data: data
        }, {
          type: SchoolTypes.CREATE_SCHOOL_SUCCESS,
          data: undefined
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ status: 200 }));

      const store = mockStore(initialState);
      store.dispatch(actions.createSchool(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches request and failed actions when status is NOT 200', done => {
      const expectedActions = [
        {
          type: SchoolTypes.CREATE_SCHOOL,
          data: data
        }, {
          type: SchoolTypes.CREATE_SCHOOL_FAILURE,
          error: 'Oops! Something went wrong and we couldn\'t create your school.',
        }
      ];
      sandbox.stub(axios, 'post').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t create your school.'}));

      const store = mockStore(initialState);
      store.dispatch(actions.createSchool(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('updateSchool dispatches a change action on success', done => {
      const expectedActions = [{
        data: data,
        type: SchoolTypes.UPDATE_SCHOOL
      }, {
        data: undefined,
        type: SchoolTypes.UPDATE_SCHOOL_SUCCESS
      }];
      sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.updateSchool(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('updateSchool dispatches a failed action on failure', done => {
      const expectedActions = [{
        data: data,
        type: SchoolTypes.UPDATE_SCHOOL
      }, {
        error: 'Oops! Something went wrong and we couldn\'t create your school.',
        type: SchoolTypes.UPDATE_SCHOOL_FAILURE
      }];
      sandbox.stub(axios, 'put').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t delete your school.'}));
      const store = mockStore();
      store.dispatch(actions.updateSchool(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteSchool dispatches a delete action on success', done => {
      const expectedActions = [{
        data: data,
        type: 'DELETE_SCHOOL_REQUEST'
      }, {
        data: undefined,
        type: 'DELETE_SCHOOL_SUCCESS'
      }];
      sandbox.stub(axios, 'delete').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.deleteSchool(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteSchool dispatches a failure event on failure', done => {
      const expectedActions = [{
        type: SchoolTypes.DELETE_SCHOOL_REQUEST,
        data: data
      }, {
        type: SchoolTypes.DELETE_SCHOOL_FAILURE,
        error: 'Oops! Something went wrong and we couldn\'t delete your school.',
      }];
      sandbox.stub(axios, 'delete').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t delete your school.'}));
      const store = mockStore();
      store.dispatch(actions.deleteSchool(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

  });
});
