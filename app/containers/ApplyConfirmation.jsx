import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import * as profileActionCreators from 'actions/profiles';
import * as applyActionCreators from 'actions/apply';

import styles from 'css/components/applyConfirmation';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class ApplyConfirmation extends React.Component {
  
  componentWillMount() {
    const { profileActions } = this.props;
    profileActions.fetchProfile();
  }

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
      <div className={cx('confirmation') + ' container'}>
        <div className={cx('paper')} >
          <div className={cx('thanks')}>Thank you again. We will follow up shortly to notify you of next steps.</div>
          <div className={cx('btn-group')}>
            <RaisedButton className='pull-center' label="View/Edit Profile" onClick={this.navBack.bind(this)} primary={true} />
          </div>
        </div>
      </div>
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