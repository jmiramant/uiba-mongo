import React, { Component, PropTypes } from 'react';
import { fetchCurrentProfile } from 'actions/profiles';
import { fetchCurrentJobs } from 'actions/jobs';
import { connect } from 'react-redux';
import Jobs from 'components/JobList';

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
        <h1 className={cx('header')}>Uiba Profile</h1>
        <div className={cx('description')}>
        <div>{profile.name}</div>
        <Jobs jobs={jobs}/>
        </div>
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