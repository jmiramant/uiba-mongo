import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { validateSignupHelper } from '../helpers/signupValidations';

import classNames from 'classnames/bind';
import styles from 'css/components/login';
import moment from 'moment';

const cx = classNames.bind(styles);

export default class SignupFrom extends React.Component {
  
  static propTypes = {
    user: PropTypes.object.isRequired,
    onSumbit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  state = {
    formInputs: {},
    validationErrors: {},
  }

  onDataChange = field => (e, uiVal) => {
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [field]: uiVal,
      }
    });  
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {
      this.props.onSumbit(this.state.formInputs);
    }
  }

  validate() {
    const validationResp = validateSignupHelper(this.state.formInputs, this.state.validationErrors);
    this.setState({validationErrors: validationResp.errors});
    return validationResp.containsErrors;
  }

  // componentWillEnter(callback) {
  //   const el = findDOMNode(this);
  //   TweenMax.fromTo(el, 0.3, {x: -100, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});
  // }

  // componentWillLeave (callback) {
  //   const el = findDOMNode(this);
  //   TweenMax.fromTo(el, 0.3, {x: 0, opacity: 1}, {x: 100, opacity: 0, onComplete: callback});
  // }

  render () {
    const {
      user
    } = this.props;
    const {
      validationErrors
    } = this.state;
    return (
      <div>
        <p>{user.message}</p>
        <TextField
          fullWidth={true} 
          onChange={this.onDataChange('first')}
          errorText={validationErrors.first}
          floatingLabelText="First Name"
        />
        <TextField
          fullWidth={true} 
          onChange={this.onDataChange('last')}
          errorText={validationErrors.last}
          floatingLabelText="Last Name"
        />
        <TextField
          fullWidth={true} 
          onChange={this.onDataChange('email')}
          errorText={validationErrors.email}
          floatingLabelText="Email"
        />
        <TextField
          fullWidth={true} 
          onChange={this.onDataChange('password')}
          type='password'
          errorText={validationErrors.password}
          floatingLabelText="Password"
        />
        <TextField
          fullWidth={true} 
          type='password'
          onChange={this.onDataChange('confirm')}
          errorText={validationErrors.confirm}
          floatingLabelText="Confirm Password"
        />
        <RaisedButton className={cx('btn')} label='Register' onClick={this.handleSubmit} primary={true} />
      </div>
    );
  }
}