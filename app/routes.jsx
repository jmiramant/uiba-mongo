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
import ApplyConfirmation from 'containers/ApplyConfirmation';

import { recoveryCapture } from 'actions/apply';


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
        pathname: '/profile'
      });
    }
    callback();
  };


  const tempApplyredirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    
    if (authenticated) {
      if (nextState.location && nextState.location.query && nextState.location.query) {
        recoveryCapture(nextState.location.query.rid)
      }
      replace({
        pathname: '/profile'
      });
    }
    callback();
  };
  
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Splash} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth}></Route>
      <Route path="applyConfirmation" component={ApplyConfirmation}></Route>
      <Route path="apply/:companyName" component={Apply} onEnter={tempApplyredirectAuth}></Route>
      <Route path="profile" component={Profile} onEnter={requireAuth}></Route>
      <Route path="email-confirmation" component={Confirmation} ></Route>
      <Route path="about" component={About}></Route>
      <Route path="terms" component={Terms}></Route>
      <Route path="privacy" component={Privacy}></Route>
    </Route>
  );
};
