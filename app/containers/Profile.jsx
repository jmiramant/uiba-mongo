import React, { Component, PropTypes } from 'react';
import { fetchCurrentUser } from 'actions/users';
import { fetchCurrentProfile } from 'actions/profiles';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

const loadData = (props) => {
  props.fetchCurrentUser()
  props.fetchCurrentProfile()
}

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    loadData(this.props)
  }
  
  render() {
    const { profile, user } = this.props;
    return (
      <div className={cx('about')}>
        <h1 className={cx('header')}>Uiba Profile</h1>
        <div className={cx('description')}>
          <img src={profile.picture} />
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

export default connect(mapStateToProps, {
  fetchCurrentUser,
  fetchCurrentProfile
})(Profile);