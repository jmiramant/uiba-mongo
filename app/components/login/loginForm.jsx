import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { validateLoginHelper } from '../helpers/loginValidations';

import classNames from 'classnames/bind';
import styles from 'css/components/login';
import moment from 'moment';

const cx = classNames.bind(styles);

export default class LoginFrom extends React.Component {
  
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
    const validationResp = validateLoginHelper(this.state.formInputs, this.state.validationErrors);
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
        {user.message.length ? (<p className={cx('error')}>{user.message}</p>) : (null)}
        <TextField
          fullWidth={true} 
          errorText={validationErrors.email}
          floatingLabelText="Email"
          onChange={this.onDataChange('email')}
        />
        <TextField
          fullWidth={true} 
          type='password'
          errorText={validationErrors.password}
          floatingLabelText="Password"
          onChange={this.onDataChange('password')}
        />
        <RaisedButton className={cx('btn')} label='Login' onClick={this.handleSubmit} primary={true} />
      </div>
    );
  }
}