import React, { Component, PropTypes } from 'react';
import { fetchCurrentProfile } from 'actions/profiles';
import { fetchJobs, createJob } from 'actions/jobs';
import { connect } from 'react-redux';
import Jobs from 'components/profile/JobList';
import UserCard from 'components/profile/userCard';

import classNames from 'classnames/bind';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

class Profile extends Component {
  
  static need = [  // eslint-disable-line
    fetchCurrentProfile,
    fetchJobs,
  ]

  constructor(props) {
    super(props)
  }

  saveJob (data) {
    console.log(this.props.createJob(data)())
  }

  render() {
    const { createJob,
            jobs,
            profile
          } = this.props;
    return (
      <div className={cx('about') + ' container'}>
        <Jobs jobs={jobs} onJobSave={this.saveJob.bind(this)} />
        <UserCard profile={profile} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    jobs: state.job.jobs,
    profile: state.profile.currentProfile,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    createJob: createJob.bind(dispatch),
    fetchCurrentProfile: fetchCurrentProfile,
    fetchJobs: fetchJobs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);