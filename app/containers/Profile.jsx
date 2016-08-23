import React, { Component, PropTypes } from 'react';
import { fetchCurrentProfile } from 'actions/profiles';

import { fetchJobs, 
         createJob,
         updateJob,
         deleteJob } from 'actions/jobs';

import { fetchSchools, 
         createSchool,
         updateSchool,
         deleteSchool } from 'actions/schools';

import { connect } from 'react-redux';

import Jobs from 'components/profile/JobList';
import Schools from 'components/profile/SchoolList';
import UserCard from 'components/profile/UserCard';

import classNames from 'classnames/bind';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

class Profile extends Component {
  static need = [  // eslint-disable-line
    fetchCurrentProfile,
    fetchSchools,
    fetchJobs,
  ]

  constructor(props) {
    super(props)
  }

  saveJob (data) {
    this.props.createJob(data)()
  }

  onJobDelete (job) {
    this.props.deleteJob(job)()
  }

  saveSchool (data) {
    this.props.createJob(data)()
  }

  onSchoolDelete (job) {
    this.props.deleteJob(job)()
  }

  saveEdit (data) {
    this.props.updateJob(data)()
  }

  render() {
    const { jobs,
            profile,
            schools
          } = this.props;
    return (
      <div className={cx('about') + ' container'}>
        <Jobs 
          jobs={jobs} 
          onEditSave={this.saveEdit.bind(this)} 
          onJobSave={this.saveJob.bind(this)} 
          onJobDelete={this.onJobDelete.bind(this)} 
        />
        <Schools 
          schools={schools} 
          onEditSave={this.saveEdit.bind(this)} 
          onSchoolSave={this.saveSchool.bind(this)} 
          onSchoolDelete={this.onSchoolDelete.bind(this)} 
        />
        <UserCard profile={profile} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    schools: state.school.schools,
    jobs: state.job.jobs,
    profile: state.profile.currentProfile,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    createJob: createJob.bind(dispatch),
    deleteJob: deleteJob.bind(dispatch),
    updateJob: updateJob.bind(dispatch),
    createSchool: createSchool.bind(dispatch),
    deleteSchool: deleteSchool.bind(dispatch),
    updateSchool: updateSchool.bind(dispatch),
    fetchSchools: fetchSchools,
    fetchCurrentProfile: fetchCurrentProfile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);