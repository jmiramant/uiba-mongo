import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import styles from 'css/components/login';
import hourGlassSvg from 'images/hourglass.svg';

const cx = classNames.bind(styles);

class LoginOrRegister extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (isLogin) {
      manualLogin({ email, password });
    } else {
      signUp({ email, password });
    }
  }

  renderHeader() {
    const { user: { isLogin } , toggleLoginMode } = this.props;
    if (isLogin) {
      return (
        <div className={cx('header')}>
          <div className={cx('alternative')}>
            New User?
            <a className={cx('alternative-link')}
              onClick={toggleLoginMode}> Sign up Here</a>
          </div>
        </div>
      );
    }

    return (
      <div className={cx('header')}>
        <div className={cx('alternative')}>
          Already have an account?
          <a className={cx('alternative-link')}
            onClick={toggleLoginMode}> Login</a>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;

    return (
      <div className={cx('login', {
        waiting: isWaiting
      })}>
          <div className={cx('google-container')}>
            <a className={cx('button')}
          href="/auth/linkedin">Login with Linkedin</a>
          </div>
        <div>
          { this.renderHeader() }
          <img className={cx('loading')} src={hourGlassSvg} />
          <div className={cx('email-container')}>
            <form onSubmit={this.handleOnSubmit} className="pure-form pure-form-aligned">
              <fieldset>
                <div className="pure-control-group">
                  <label htmlFor="name">Email</label>
                  <input type="email" ref="email" placeholder="Email" />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" ref="password" placeholder="Password" />
                  <p className={cx('message', {
                    'message-show': message && message.length > 0
                  })}>{message}</p>
                </div>

                <div className="pure-controls">
                  <button type="submit" value={isLogin ? 'Login' : 'Register'} className="pure-button pure-button-primary">Submit</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
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

