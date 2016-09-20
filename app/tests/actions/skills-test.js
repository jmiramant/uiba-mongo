/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/skills';
import * as types from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Skill Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    const skill = 'Node.js';
    const profile_id = md5.hash(skill);
    const id = md5.hash(skill);
    const data = {
      id,
      profile_id,
      type: skill, 
      proficiency: 1,
      lengthOfUse: 2,
    };

    const initialState = {
      skill: {
        skills: []
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
          type: types.CREATE_SKILL,
          data: data
        }, {
          type: types.CREATE_SKILL_SUCCESS,
          data: undefined
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ status: 200 }));

      const store = mockStore(initialState);
      store.dispatch(actions.createSkill(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches request and failed actions when status is NOT 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_SKILL,
          data: data
        }, {
          type: types.CREATE_SKILL_FAILURE,
          error: {
            data: 'Oops! Something went wrong and we couldn\'t create your skill.',
            status: 404
          }
        }
      ];
      sandbox.stub(axios, 'post').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t create your skill.'}));

      const store = mockStore(initialState);
      store.dispatch(actions.createSkill(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('updateSkill dispatches a change action on success', done => {
      const expectedActions = [{
        data: data,
        type: types.UPDATE_SKILL
      }, {
        data: undefined,
        type: types.UPDATE_SKILL_SUCCESS
      }];
      sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.updateSkill(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('updateSkill dispatches a failed action on failure', done => {
      const expectedActions = [{
        data: data,
        type: types.UPDATE_SKILL
      }, {
        error: 'Oops! Something went wrong and we couldn\'t create your skill.',
        type: types.UPDATE_SKILL_FAILURE
      }];
      sandbox.stub(axios, 'put').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t delete your skill.'}));
      const store = mockStore();
      store.dispatch(actions.updateSkill(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteSkill dispatches a delete action on success', done => {
      const expectedActions = [{
        data: data,
        type: 'DELETE_SKILL_REQUEST'
      }, {
        data: undefined,
        type: 'DELETE_SKILL_SUCCESS'
      }];
      sandbox.stub(axios, 'delete').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.deleteSkill(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteSkill dispatches a failure event on failure', done => {
      const expectedActions = [{
        type: types.DELETE_SKILL_REQUEST,
        data: data
      }, {
        type: types.DELETE_SKILL_FAILURE,
        error: 'Oops! Something went wrong and we couldn\'t delete your skill.',
      }];
      sandbox.stub(axios, 'delete').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t delete your skill.'}));
      const store = mockStore();
      store.dispatch(actions.deleteSkill(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

  });
});
