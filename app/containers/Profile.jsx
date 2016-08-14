import React, { Component, PropTypes } from 'react';
import { fetchCurrentProfile } from 'actions/profiles';
import { fetchJobs, createJob, updateJob } from 'actions/jobs';
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
    this.props.createJob(data)()
  }

  saveEdit (data) {
    this.props.updateJob(data)()
  }

  render() {
    const { jobs,
            profile
          } = this.props;
    return (
      <div className={cx('about') + ' container'}>
        <Jobs jobs={jobs} onEditSave={this.saveEdit.bind(this)} onJobSave={this.saveJob.bind(this)} />
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
    updateJob: updateJob.bind(dispatch),
    fetchCurrentProfile: fetchCurrentProfile,
    fetchJobs: fetchJobs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);