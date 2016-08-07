import React, { Component, PropTypes } from 'react';
import { fetchCurrentUser } from 'actions/users';
import { fetchCurrentProfile } from 'actions/profiles';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

class Profile extends Component {
  
  static need = [  // eslint-disable-line
    fetchCurrentUser,
    fetchCurrentProfile
  ]

  render() {
    const { profile, user } = this.props;
    return (
      <div className={cx('about')}>
        <h1 className={cx('header')}>Uiba Profile</h1>
        <div className={cx('description')}>
          <p>Current User: { user.email }</p>
          <p>Current Profile: { profile.headline }</p>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
    profile: state.profile.currentProfile,
  };
}

export default connect(mapStateToProps)(Profile);