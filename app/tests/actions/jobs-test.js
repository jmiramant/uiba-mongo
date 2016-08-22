/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/jobs';
import * as types from 'types';

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

    const index = 0;
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
          type: types.CREATE_JOB_REQUEST,
          user_id: user_id,
          company_id: company_id,
          companyName: data.companyName, 
          description: data.description,
          title: data.title,
          current: data.current,
          startDate: data.startDate,
          endDate: data.endDate,
        }, {
          type: types.CREATE_JOB_SUCCESS
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

  });
});
