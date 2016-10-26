import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
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
    </MuiThemeProvider>
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