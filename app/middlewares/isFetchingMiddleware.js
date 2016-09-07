import _ from 'lodash';

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
        console.log('loop');
        setTimeout(waitForFetching, 100);
      } else {
        console.log('resolve');
        return resolve(initialState);
      }
    }

    waitForFetching();

  }) 

}