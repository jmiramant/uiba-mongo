/**
* This looks at static needs parameter in components
* and waits for the promise to be fullfilled.
*
* It is used to make sure server side rendered pages
* wait for APIs to resolve before returning res.end().
*
* As seen in: https://github.com/caljrimmer/isomorphic-redux-app
*/

// export default function preRenderMiddleware(dispatch, components, params) {
//   return Promise.all(
//     components.reduce((previous, current) => {
//       return (current.need || []).concat(previous);
//     }, []).map(need => {
//       dispatch(need(params))
//     })
//   );
// }


export default function preRenderMiddleware(dispatch, components, params) {
  const needs = components.reduce( (prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
      .concat(prev);
    }, []);
    const promises = needs.map(need => dispatch(need()));
    console.log(promises)
    return Promise.all(promises);
}