import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Splash from 'containers/Splash';
import About from 'containers/About';
import Terms from 'containers/Terms';
import Privacy from 'containers/Privacy';
import LoginOrRegister from 'containers/LoginOrRegister';
import Profile from 'containers/Profile';
import Confirmation from 'containers/Confirmation';
import Apply from 'containers/Apply';

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Splash} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="apply/:companyName(/:recruiterId)" component={Apply} onEnter={redirectAuth} />
      <Route path="profile" component={Profile} onEnter={requireAuth}></Route>
      <Route path="email-confirmation" component={Confirmation} ></Route>
      <Route path="about" component={About} />
      <Route path="terms" component={Terms} />
      <Route path="privacy" component={Privacy} />
    </Route>
  );
};
