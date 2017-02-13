/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Route, IndexRoute, NotFoundRoute } from 'react-router';
import cookie from 'react-cookie';

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
import CompanyLogin from 'containers/CompanyLogin';
import CompanyContainer from 'containers/CompanyContainer';
import CompanyDashboard from 'containers/CompanyDashboard';
import ApplicantCompanyList from 'containers/ApplicantCompanyList';
import ApplicantList from 'containers/ApplicantList';
import ApplicantShow from 'containers/ApplicantShow';
import NotFound from 'containers/NotFound';

import { fetchCurrentUser } from 'actions/users';
import { recoveryCapture } from 'actions/apply';

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();

    store.dispatch(fetchCurrentUser());

    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const requireCompanyAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();

    store.dispatch(fetchCurrentUser());

    if (!authenticated) {
      replace({
        pathname: '/login/company',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    const applyCookie = cookie.load('applyPath');

    if (authenticated) {
      replace({
        pathname: '/profile'
      });
    } else if (applyCookie) {
      replace({
        pathname: applyCookie
      });
    }
    callback();
  };


  const tempApplyredirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();

    let path = nextState.location.pathname;
    if (nextState.location.search) {
      path += nextState.location.search;
    }

    cookie.save('applyPath', path);

    if (authenticated) {
      if (nextState.location && nextState.location.query && nextState.location.query) {
        recoveryCapture(nextState.location.query.rid);
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
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="login/company" component={CompanyLogin} onEnter={redirectAuth} />
      <Route path="applyConfirmation" component={ApplyConfirmation} />
      <Route path="apply/:companyName/:roleCode" component={Apply} onEnter={tempApplyredirectAuth} />
      <Route path="apply/:companyName" component={Apply} onEnter={tempApplyredirectAuth} />
      <Route path="profile" component={Profile} onEnter={requireAuth} />
      <Route path="email-confirmation" component={Confirmation} />
      <Route path="about" component={About} />
      <Route path="terms" component={Terms} />
      <Route path="privacy" component={Privacy} />
      <Route path="company-admin" component={CompanyContainer} onEnter={requireCompanyAuth}>
        <Route path="dashboard" component={CompanyDashboard} />
        <Route path="applicants/company/:companyId" component={ApplicantCompanyList} />
        <Route path="applicants/:roleId" component={ApplicantList} />
        <Route path="applicant/:profId" component={ApplicantShow} />
        <Route path="role/:roleId/applicant/:profId" component={ApplicantShow} />
        <Route path="applicant/:profId" component={ApplicantShow} />
      </Route>
    </Route>
  );
};
