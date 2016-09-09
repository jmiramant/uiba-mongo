import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import styles from 'css/components/login';
import hourGlassSvg from 'images/hourglass.svg';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import linkedinLogo from '../images/linkedin.svg';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

const cx = classNames.bind(styles);

class LoginOrRegister extends Component {

  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  state = {
    formInputs: {}
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const { formInputs } = this.state

    if (isLogin) {
      manualLogin(formInputs);
    } else {
      if (formInputs.confirm === formInputs.password) {
        signUp(formInputs);
      }
    }
  }

  renderForm() {
    const { user: { isLogin } , toggleLoginMode } = this.props;
    if (isLogin) {
      return (
        <div>
          <TextField
            fullWidth={true} 
            errorText={this.props.user.message}
            floatingLabelText="Email"
            onChange={this.onDataChange('email')}
          />
          <TextField
            fullWidth={true} 
            type='password'
            errorText={this.props.user.message}
            floatingLabelText="Password"
            onChange={this.onDataChange('password')}
          />
        </div>
      );
    }

    return (
      <div>
        <TextField
          fullWidth={true} 
          onChange={this.onDataChange('first')}
          errorText={this.props.user.message}
          floatingLabelText="First Name"
        />
        <TextField
          fullWidth={true} 
          onChange={this.onDataChange('last')}
          errorText={this.props.user.message}
          floatingLabelText="Last Name"
        />
        <TextField
          fullWidth={true} 
          onChange={this.onDataChange('email')}
          errorText={this.props.user.message}
          floatingLabelText="Email"
        />
        <TextField
          fullWidth={true} 
          onChange={this.onDataChange('password')}
          type='password'
          errorText={this.props.user.message}
          floatingLabelText="Password"
        />
        <TextField
          fullWidth={true} 
          type='password'
          onChange={this.onDataChange('formInputs.confirm')}
          errorText={this.props.user.message}
          floatingLabelText="Confirm Password"
        />
      </div>
    );
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
              <img src={linkedinLogo} />
              </a>
            </div>
            <Divider/>
            

              <div>
                <div className={cx('toggle-container')}>
                  <p 
                    className={cx('toggle')}
                  >
                    Log In
                  </p>
                  <Toggle
                    className={cx('toggle')}
                    onToggle={toggleLoginMode}
                    style={{width: 50}}
                  />
                  <p 
                    className={cx('toggle')}
                  >
                    Sign Up
                  </p>
                </div>

              <div className={cx('email-container')}>
                { this.renderForm() }
                <RaisedButton className={cx('btn')} label={this.props.user.isLogin ? 'Login' : 'Register'} onClick={this.handleOnSubmit} primary={true} />
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

