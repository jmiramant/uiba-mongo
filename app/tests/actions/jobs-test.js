/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/jobs';
import { JobTypes } from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Job Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    function createDateObj (date) {
      const split = date.split('-');
      return new Date(split[0], split[1], split[2])
    };

    const companyName = 'Pollo Loco';
    const user_id = md5.hash(companyName);
    const company_id = md5.hash(companyName);
    const id = md5.hash(companyName);
    const data = {
      id,
      user_id: user_id,
      company_id: company_id,
      companyName: companyName, 
      description: 'I run the finest chicken places in New Mexico.',
      title: 'CEO',
      current: false,
      startDate: createDateObj('2015-01-01'),
      endDate: createDateObj('2016-01-01'),
    };

    const initialState = {
      job: {
        jobs: []
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
          type: JobTypes.CREATE_JOB,
          data: data
        }, {
          type: JobTypes.CREATE_JOB_SUCCESS,
          data: undefined
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ status: 200 }));

      const store = mockStore(initialState);
      store.dispatch(actions.createJob(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches request and failed actions when status is NOT 200', done => {
      const expectedActions = [
        {
          type: JobTypes.CREATE_JOB,
          data: data
        }, {
          type: JobTypes.CREATE_JOB_FAILURE,
          error: 'Oops! Something went wrong and we couldn\'t create your job.'
        }
      ];
      sandbox.stub(axios, 'post').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t create your topic'}));

      const store = mockStore(initialState);
      store.dispatch(actions.createJob(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('updateJob dispatches a change action on success', done => {
      const expectedActions = [{
        data: data,
        type: JobTypes.UPDATE_JOB
      }, {
        data: undefined,
        type: JobTypes.UPDATE_JOB_SUCCESS
      }];
      sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.updateJob(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('updateJob dispatches a failed action on failure', done => {
      const expectedActions = [{
        data: data,
        type: JobTypes.UPDATE_JOB
      }, {
        error: 'Oops! Something went wrong and we couldn\'t create your job.',
        type: JobTypes.UPDATE_JOB_FAILURE
      }];
      sandbox.stub(axios, 'put').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t delete your job.'}));
      const store = mockStore();
      store.dispatch(actions.updateJob(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteJob dispatches a delete action on success', done => {
      const expectedActions = [{
        data: data,
        type: 'DELETE_JOB_REQUEST'
      }, {
        data: undefined,
        type: 'DELETE_JOB_SUCCESS'
      }];
      sandbox.stub(axios, 'delete').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.deleteJob(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteJob dispatches a failure event on failure', done => {
      const expectedActions = [{
        type: JobTypes.DELETE_JOB_REQUEST,
        data: data
      }, {
        type: JobTypes.DELETE_JOB_FAILURE,
        error: 'Oops! Something went wrong and we couldn\'t delete your job.',
      }];
      sandbox.stub(axios, 'delete').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t delete your job.'}));
      const store = mockStore();
      store.dispatch(actions.deleteJob(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

  });
});
