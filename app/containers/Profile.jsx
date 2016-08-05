import React, { Component, PropTypes } from 'react';
import { fetchCurrentUser } from 'actions/users';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

class Profile extends Component {
  
  static need = [  // eslint-disable-line
    fetchCurrentUser
  ]

  render() {
    return (
      <div className={cx('about')}>
        <h1 className={cx('header')}>Uiba Profile</h1>
        <div className={cx('description')}>
          <p>Checkout all this cool information.</p>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.user,
  };
}

export default connect(mapStateToProps)(Profile);
