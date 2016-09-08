import axios from 'axios';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Promise from 'bluebird';
import createRoutes from 'routes';
import configureStore from 'store/configureStore';
import preRenderMiddleware from 'middlewares/preRenderMiddleware';
// import isFetchingMiddleware from 'middlewares/isFetchingMiddleware';
import header from 'components/Meta';
import ssrAuth from 'api/preRenderAuthentication.js';
import injectTapEventPlugin from 'react-tap-event-plugin'
import _ from 'lodash';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const analtyicsScript =
  typeof trackingID === "undefined" ? ``
  :
  `<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', ${trackingID}, 'auto');
    ga('send', 'pageview');
  </script>`;

const trackingID  = "UA-81887884-1";

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();
  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true,
    }
  }, history);
  const routes = createRoutes(store);

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(err, redirect, props)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructured
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - err:       A javascript Error object if an error occured, `undefined` otherwise.
   * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
   * - props:     The props you should pass to the routing context if the route matched,
   *              `undefined` otherwise.
   * If all three parameters are `undefined`, this means that there was no route found matching the
   * given location.
   */

const fetchPromise = (cb) => {
  console.log('func')
  let initialState = store.getState();
  let count = 0;
  console.log('pre-internal func')

  const waitForFetching = () => {
    console.log('1')
    initialState = store.getState();
    console.log('2')
    console.log(initialState)
    let fetching = _.reduce(initialState, (prev, next) => {
      prev.push(next.isFetching);
      return prev
    }, []);
    console.log('3')
    console.log(fetching)
    if (fetching.indexOf(true) !== -1) {
      console.log('loop')
      console.log(initialState)
      count += 1;
      console.log('count: ', count)
      setTimeout(waitForFetching, 100);
      // if (count > 30) {
      //   reject('There was an error fetching initial data.')
      // } else {
      // }
    } else {
      console.log('resolve')
      return cb(initialState)
    }
  }
  console.log('initial func call')
  waitForFetching();
}


  if(authenticated){
   ssrAuth(req.headers.cookie);
  }

  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      // This method waits for all render component
      // promises to resolve before returning to browser
      preRenderMiddleware(
        store.dispatch,
        props.components,
        props.params
      )
      .then(() => {
        //after preRendering is complete, we destroy the interceptors
        authenticated ? ssrAuth() : null;
      })
      .then(() => {
        console.log('pre promise')
        return fetchPromise( (initialState) => {
          console.log('fetchPromise return')
          console.log('initialState')
          console.log(initialState)
          const componentHTML = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          );

          return res.status(200).send(`
            <!doctype html>
            <html ${header.htmlAttributes.toString()}>
              <head>
                ${header.title.toString()}
                ${header.meta.toString()}
                ${header.link.toString()}
              </head>
              <body>
                <div id="app">${componentHTML}</div>
                <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
                ${analtyicsScript}
                <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
              </body>
            </html>
          `);   
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
    } else {
      res.sendStatus(404);
    }
  });
}
