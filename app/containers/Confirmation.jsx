import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import * as confirmationActionCreators from 'actions/confirmation';

import Resend from 'components/ResendConfirmationEmail';

import styles from 'css/components/confirmation';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Confirmation = (props) => {
  
  const {
    confirmation,
    confirmationActions
  } = props;

  return (
    <div className={cx('confirmation') + ' container'}>
      <div className={cx('paper')} >
        <div className={cx('thanks')}>Thank you for registering!</div>
        <h4>You should receive an email shortly with a link to confirm your email.</h4>

        <p>If you do not receive a confirm please double check your spam filter or you can resend your email:</p>
        <Resend
          {...confirmation}
          toggleResend={confirmationActions.toggleResend}
          handleSubmit={confirmationActions.resend}
          onEmailChange={confirmationActions.confirmEmailChange}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    confirmation: state.confirmation,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    confirmationActions: bindActionCreators(confirmationActionCreators, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation);