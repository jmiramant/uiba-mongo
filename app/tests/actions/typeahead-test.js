/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/typeahead';
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

    const name = 'Concordia College Alabama';
    const id = md5.hash(name);
    const data = {
      id,
      name
    };

    const initialState = {
      typeahead: {
        typeahead: []
      }
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    // it('dispatches request and success actions when status is 200', done => {
    //   const expectedActions = [
    //     {
    //       data: 'a'
    //     }, {
    //       type: types.UPDATE_RESULTS_SUCCESS,
    //       data: undefined
    //     }
    //   ];

    //   sandbox.stub(axios, 'get').returns(Promise.resolve({ status: 200 }));

    //   const store = mockStore(initialState);
    //   store.dispatch(actions.fetchTypeaheadData('a'))
    //     .then(() => {
    //       expect(store.getActions()).toEqual(expectedActions);
    //     }).then(done)
    //     .catch(done);
    // });    


  });
});
