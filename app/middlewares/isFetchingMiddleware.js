import _ from 'lodash';
import { polyfill } from 'es6-promise';

polyfill()

export default function isFetchingMiddleware(store) {

  return new Promise((resolve, reject) => {  
    let initialState = store.getState();

    const waitForFetching = () => {
      initialState = store.getState();

      let fetching = _.reduce(initialState, function (prev, next) {
         prev.push(next.isFetching);
         return prev
      }, []).includes(true)

      if (fetching) {
        setTimeout(waitForFetching, 100);
      } else {
        resolve(initialState);
      }
    }

    waitForFetching();

  }) 

}