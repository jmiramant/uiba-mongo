import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import { mixpanelURLTrack } from 'middlewares/mixpanelTrackers';

import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import linkedinLogo from '../images/linkedin.svg';

import LoginForm from 'components/login/loginForm';
import SignupForm from 'components/login/signupForm';

import * as userActionCreators from 'actions/users';
import * as companyActionCreators from 'actions/companies';
import * as roleActionCreators from 'actions/roles';

import styles from 'css/components/apply';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Apply extends Component {

  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.props.userActions.toggleLoginMode(this.props.user.isLogin);
    this.fetchCompanyData();
    if (this.props.params.roleCode) this.fetchRoleData();
  }

  componentDidMount() {
    mixpanelURLTrack("APPLY[load]:init");
  }

  fetchCompanyData() {
    const { params, companyActions } = this.props;
    companyActions.fetchCompany(params.companyName.toLowerCase())
  }

  fetchRoleData() {
    this.props.roleActions.fetchRole(this.props.params.roleCode)
  }

  state = {
    formInputs: {}
  }

  handleOnSubmit(data) {
    const { manualLogin, signUp} = this.props.userActions
    const { user: { isLogin } } = this.props;

    cookie.remove('applyPath');
    mixpanelURLTrack('APPLY[click]:emailBtn');

    if (isLogin) {
      manualLogin(data);
    } else {
      signUp(data);
    }
  }

  renderForm() {
    const { user: { isLogin } } = this.props
    const {toggleLoginMode } = this.props.userActions;
    if (isLogin) {
      return (
        <LoginForm
          user={this.props.user}
          onSumbit={this.handleOnSubmit}
        />     
      );
    }

    return (
      <SignupForm
        user={this.props.user}
        onSumbit={this.handleOnSubmit}
      />
    );
  }

  showCompanyLogo(company) {
    var logo = require('images/truveris-logo.png');
    return (<div><img src={logo}/></div>)
  }

  setLoginState(isLogin) {
    this.props.userActions.toggleLoginMode(isLogin)
  }

  onDataChange = field => (e, uiVal) => {
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [field]: uiVal,
      }
    });  
  }

  trackLinkedAuth() {
    mixpanelURLTrack('APPLY[click]:linkedinBtn');
  }

  render () {

    const {
      role,
      userActions: { toggleLoginMode }, 
      user: { isWaiting, message, isLogin }, 
      location: { query: { rid } },
      companyFetching,
      company
    } = this.props;

    const applyPage = (
      <div>
        <div className={cx('welcome-text')}>
          <h3 className={cx('apply-header')}>Welcome to the {company.name} Career Portal</h3>
          <p className={cx('text')}>We’re excited you’re applying to {company.name}. To ensure we understand your qualifications, please create a profile and fill out the requested information. It is important you complete as much information as possible because the profile, not your resume, will be used to assess your qualifications.</p>
          <p className={cx('text')}>Once you’re finished, simply click submit and you’ll receive an automated message thanking you. We will follow up with you shortly to notify you of next steps. </p>
          
          { company._id ? (
            <div >
              <h4>Company Description</h4>
              <p>{company.description}</p>
            </div>
          ) : (null)}

          { role._id ? (
            <span>
              <div>
                <h4>Role: {role.title}</h4>
                <p>{role.description}</p>
              </div>
            </span>
          ) : (null)}

          <Divider />
          <p className={cx('text', 'big')}>Please get started by registering:</p>
        </div>
        <div className={cx('login-container')}>
          <div className={cx('login', {
            waiting: isWaiting
          })}>
              <div>
                <div className={cx('toggle-container')}>
                  <p 
                    onClick={() => { this.setLoginState('true')}}
                    className={cx('toggle', {
                      'active': isLogin
                    })}
                  >
                    Log In
                  </p>
                  <Toggle
                    className={cx('toggle')}
                    onToggle={toggleLoginMode}
                    style={{width: 50}}
                    toggled={!isLogin}
                  />
                  <p 
                    onClick={() => { this.setLoginState('false')}}
                    className={cx('toggle', {
                      'active': !isLogin
                    })}
                  >
                    Sign Up
                  </p>

                </div>

              <div className={cx('email-container')}>
                { this.renderForm() }
              </div>

            </div>
          </div>
        </div>
      </div>
    )

    const loadingPage = (
      <div className={cx('welcome-text')}>
        <p>Loading Career Protal</p>
      </div>
    )

    const notFound = (
      <div className={cx('welcome-text')}>
        <p>I'm sorry. There is not company or role found via this URL. Please confirm the web address with you referrer.</p>
      </div>
    )

    return (
      <div className={cx('apply-container')}>
        {
          company.name ? (applyPage) : (
            companyFetching ? (loadingPage) : (notFound)
          )
        }
      </div>
    );
  }
};


function mapStateToProps(state) {
  return {
    user: state.user,
    company: state.company.company,
    companyFetching: state.company.isFetching,
    role: state.role.role
  };
}

function mapDispatchToProps (dispatch) {
  return {
    userActions: bindActionCreators(userActionCreators, dispatch),
    companyActions: bindActionCreators(companyActionCreators, dispatch),
    roleActions: bindActionCreators(roleActionCreators, dispatch),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Apply);