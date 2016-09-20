/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/projects';
import * as types from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Project Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    function createDateObj (date) {
      const split = date.split('-');
      return new Date(split[0], split[1], split[2])
    };

    const name = 'Whitepaper';
    const profile_id = md5.hash(name);
    const id = md5.hash(name);
    const data = {
      id,
      profile_id: profile_id,
      name: name,
      description: 'This is a description of a project.',
      projectUrl: 'www.google.com',
      startDate: createDateObj('2015-01-01'),
      endDate: createDateObj('2016-01-01'),
      current: false,
    };

    const initialState = {
      project: {
        projects: []
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
          type: types.CREATE_PROJECT,
          data: data
        }, {
          type: types.CREATE_PROJECT_SUCCESS,
          data: undefined
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ status: 200 }));

      const store = mockStore(initialState);
      store.dispatch(actions.createProject(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches request and failed actions when status is NOT 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_PROJECT,
          data: data
        }, {
          type: types.CREATE_PROJECT_FAILURE,
          error: 'Oops! Something went wrong and we couldn\'t create your project.'
        }
      ];
      sandbox.stub(axios, 'post').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t create your project'}));

      const store = mockStore(initialState);
      store.dispatch(actions.createProject(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('updateProject dispatches a change action on success', done => {
      const expectedActions = [{
        data: data,
        type: types.UPDATE_PROJECT
      }, {
        data: undefined,
        type: types.UPDATE_PROJECT_SUCCESS
      }];
      sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.updateProject(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('updateProject dispatches a failed action on failure', done => {
      const expectedActions = [{
        data: data,
        type: types.UPDATE_PROJECT
      }, {
        error: 'Oops! Something went wrong and we couldn\'t create your project.',
        type: types.UPDATE_PROJECT_FAILURE
      }];
      sandbox.stub(axios, 'put').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t create your project.'}));
      const store = mockStore();
      store.dispatch(actions.updateProject(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteProject dispatches a delete action on success', done => {
      const expectedActions = [{
        data: data,
        type: 'DELETE_PROJECT_REQUEST'
      }, {
        data: undefined,
        type: 'DELETE_PROJECT_SUCCESS'
      }];
      sandbox.stub(axios, 'delete').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.deleteProject(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteProject dispatches a failure event on failure', done => {
      const expectedActions = [{
        type: types.DELETE_PROJECT_REQUEST,
        data: data
      }, {
        type: types.DELETE_PROJECT_FAILURE,
        error: 'Oops! Something went wrong and we couldn\'t delete your project.',
      }];
      sandbox.stub(axios, 'delete').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t delete your project.'}));
      const store = mockStore();
      store.dispatch(actions.deleteProject(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

  });
});
