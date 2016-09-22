/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/languages';
import * as types from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Language Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    const language = 'Node.js';
    const profile_id = md5.hash(language);
    const id = md5.hash(language);
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
      language: {
        languages: []
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
          type: types.CREATE_LANGUAGE,
          data: data
        }, {
          type: types.CREATE_LANGUAGE_SUCCESS,
          data: undefined
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ status: 200 }));

      const store = mockStore(initialState);
      store.dispatch(actions.createLanguage(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches request and failed actions when status is NOT 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_LANGUAGE,
          data: data
        }, {
          type: types.CREATE_LANGUAGE_FAILURE,
          error: { data: 'Oops! Something went wrong and we couldn\'t create your language.', status: 404 }
        }
      ];
      sandbox.stub(axios, 'post').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t create your language.'}));

      const store = mockStore(initialState);
      store.dispatch(actions.createLanguage(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('updateLanguage dispatches a change action on success', done => {
      const expectedActions = [{
        data: data,
        type: types.UPDATE_LANGUAGE
      }, {
        data: undefined,
        type: types.UPDATE_LANGUAGE_SUCCESS
      }];
      sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.updateLanguage(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('updateLanguage dispatches a failed action on failure', done => {
      const expectedActions = [{
        data: data,
        type: types.UPDATE_LANGUAGE
      }, {
        error: { data: 'Oops! Something went wrong and we couldn\'t delete your language.', status: 404 },
        type: types.UPDATE_LANGUAGE_FAILURE
      }];
      sandbox.stub(axios, 'put').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t delete your language.'}));
      const store = mockStore();
      store.dispatch(actions.updateLanguage(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteLanguage dispatches a delete action on success', done => {
      const expectedActions = [{
        data: data,
        type: 'DELETE_LANGUAGE_REQUEST'
      }, {
        data: undefined,
        type: 'DELETE_LANGUAGE_SUCCESS'
      }];
      sandbox.stub(axios, 'delete').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.deleteLanguage(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteLanguage dispatches a failure event on failure', done => {
      const expectedActions = [{
        type: types.DELETE_LANGUAGE_REQUEST,
        data: data
      }, {
        type: types.DELETE_LANGUAGE_FAILURE,
        error: 'Oops! Something went wrong and we couldn\'t delete your language.',
      }];
      sandbox.stub(axios, 'delete').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t delete your language.'}));
      const store = mockStore();
      store.dispatch(actions.deleteLanguage(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

  });
});
