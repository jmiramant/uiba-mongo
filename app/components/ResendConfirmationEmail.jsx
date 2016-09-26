import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ErrorMessage from 'components/ErrorMessage';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/null';

const cx = classNames.bind(styles);

export default class ResendConfirmationEmail extends React.Component {
  
  static propTypes = {
    email: PropTypes.string,
    onEmailChange: PropTypes.func,
    onSubmit: PropTypes.func,
    toggleResend: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    this.props.handleSubmit(this.props.email)
  }

  handleChange(e, val) {
    this.props.onEmailChange(val)
  }

  render () {
    const {
            email,
            show,
            message,
            toggleResend,
            onEmailChange,
          } = this.props;
    return (
      <div className={cx('resend-container')}>
        <div>{message}</div>
        { show ? (
          <div>
            <TextField
              value={email}
              hintText="Please enter your email."
              onChange={this.handleChange.bind(this)}
            />
            <br />
            <FlatButton onClick={this.handleSubmit.bind(this)} label="Resend Email" primary={true} />
          </div>
        ) : (
          <FlatButton label="Resend Email" onClick={toggleResend} primary={true} />
        )}
      </div>
    )
  
  }
};