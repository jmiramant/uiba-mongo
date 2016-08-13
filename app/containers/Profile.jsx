import React, { Component, PropTypes } from 'react';
import { fetchCurrentProfile } from 'actions/profiles';
import { fetchCurrentJobs } from 'actions/jobs';
import { connect } from 'react-redux';
import Jobs from 'components/profile/JobList';
import UserCard from 'components/profile/userCard';

import classNames from 'classnames/bind';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

class Profile extends Component {
  
  static need = [  // eslint-disable-line
    fetchCurrentProfile,
    fetchCurrentJobs,
  ]

  constructor(props) {
    super(props)
  }

  render() {
    const { jobs, profile } = this.props;
    return (
      <div className={cx('about') + ' container'}>
        <Jobs jobs={jobs}/>
        <UserCard profile={profile} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    jobs: state.job.currentJobs,
    profile: state.profile.currentProfile,
  };
}

export default connect(mapStateToProps, {
  fetchCurrentProfile,
  fetchCurrentJobs,
})(Profile);
