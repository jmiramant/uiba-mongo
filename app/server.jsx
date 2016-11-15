import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import createRoutes from 'routes';
import header from 'components/Meta';
import { Provider } from 'react-redux';
import { polyfill } from 'es6-promise';
import { renderToString } from 'react-dom/server';
import configureStore from 'store/configureStore';
import ssrAuth from 'api/preRenderAuthentication.js';
import injectTapEventPlugin from 'react-tap-event-plugin'
import preRenderMiddleware from 'middlewares/preRenderMiddleware';
import { createMemoryHistory, match, RouterContext } from 'react-router';

polyfill();

injectTapEventPlugin()

const hostName = process.env.HOSTNAME;
const clientConfig = {
  host: (hostName && hostName.substr(0, hostName.length - 1)) || 'localhost',
  port: process.env.PORT || '3000'
};

// configure baseURL for axios requests (for serverside API calls)
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = `http://${clientConfig.host}`;
} else {
  axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;
}

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

let analtyicsScript = ``;
let mixpanelScript = ``;

if (process.env.NODE_ENV === 'production') {
  analtyicsScript = `<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-87261456-1', 'auto');
    ga('send', 'pageview');
  </script>`;

  mixpanelScript = `<!-- start Mixpanel --><script type="text/javascript">(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
  0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
    for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
  mixpanel.init("b84e99f68633d8d44fc796c3ce47296e");</script><!-- end Mixpanel -->`;

}
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


  if (authenticated) {
    ssrAuth(req.headers.cookie);
  }

  match({
    routes,
    location: req.url
  }, (err, redirect, props) => {
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
          return new Promise((resolve, reject) => {
            let initialState = store.getState();

            const waitForFetching = () => {
              initialState = store.getState();

              let fetching = (_.reduce(initialState, (prev, next) => {
                prev.push(next.isFetching);
                return prev
              }, []).indexOf(true) !== -1);

              if (fetching) {
                setTimeout(waitForFetching, 250);
              } else {
                resolve(store.getState());
              }
            }

            return waitForFetching();
          })
        })
        .then((initialState) => {
          const componentHTML = renderToString( < Provider store = {
              store
            } >
            < RouterContext {...props
            }
            /> < /Provider >
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
              ${mixpanelScript}
              <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
            </body>
          </html>
        `);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res.sendStatus(404);
    }
  });
}