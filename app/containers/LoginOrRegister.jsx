import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import { mixpanelURLTrack } from 'middlewares/mixpanelTrackers';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import linkedinLogo from '../images/linkedin.svg';

import LoginForm from 'components/login/loginForm';
import SignupForm from 'components/login/signupForm';

import classNames from 'classnames/bind';
import styles from 'css/components/login';
const cx = classNames.bind(styles);

class LoginOrRegister extends Component {

  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.props.toggleLoginMode(this.props.user.isLogin)
  }

  componentDidMount() {
    mixpanelURLTrack('LOGIN[load]:init');
  }

  state = {
    formInputs: {}
  }

  handleOnSubmit(data) {
    const { manualLogin, signUp, user: { isLogin } } = this.props;

    if (isLogin) {
      manualLogin(data);
    } else {
      signUp(data);
    }
  }

  renderForm() {
    const { user: { isLogin } , toggleLoginMode } = this.props;
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

  setLoginState(isLogin) {
    this.props.toggleLoginMode(isLogin)
  }

  onDataChange = field => (e, uiVal) => {
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [field]: uiVal,
      }
    });  
  }

  render() {
    const { user: { isLogin } , toggleLoginMode } = this.props;
    const { isWaiting, message } = this.props.user;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <div className={cx('login', {
            waiting: isWaiting
          })}>
            <div className={cx('li-container')}>
              <a className={cx('li-auth')}
                href="/auth/linkedin"
              >
              <div className={cx('li-btn-container')}>
                <img src={linkedinLogo} />
                <p>{isLogin ? ('Log In'):('Signup')} Using LinkedIn</p>
              </div>
              </a>

            </div>
            <Divider/>
            

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
      </MuiThemeProvider> 
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};

function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps, { manualLogin, signUp, toggleLoginMode })(LoginOrRegister);

