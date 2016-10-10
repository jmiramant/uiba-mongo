import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import * as profileActionCreators from 'actions/profiles';
import * as applyActionCreators from 'actions/apply';

import styles from 'css/components/applyConfirmation';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default class ApplyConfirmation extends React.Component {
  
  static need = [  // eslint-disable-line
    profileActionCreators.fetchProfile
  ]

  constructor(props) {
    super(props)
  }

  navBack() {
    this.props.applyActions.navBackToProfile();
  }

  render() {
    const {
      profile: {profile:{apply:{name}} }
    } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className={cx('confirmation') + ' container'}>
          <div className={cx('paper')} >
            <div className={cx('thanks')}>Thank you again for applying to {name}. We will follow up shortly to notify you of next steps.</div>
            <div className={cx('btn-group')}>
              <RaisedButton className='pull-center' label="View/Edit Profile" onClick={this.navBack.bind(this)} primary={true} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

};

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

function mapDispatchToProps (dispatch) {
  return {
    profileActions: bindActionCreators(profileActionCreators, dispatch),
    applyActions: bindActionCreators(applyActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyConfirmation);