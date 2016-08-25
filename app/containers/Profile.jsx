import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as jobsActionCreators from 'actions/jobs';
import * as schoolsActionCreators from 'actions/schools';
import * as profileActionCreators from 'actions/profiles';

import Jobs from 'components/profile/JobList';
import Schools from 'components/profile/SchoolList';
import UserCard from 'components/profile/UserCard';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Profile extends Component {
  static need = [  // eslint-disable-line
    profileActionCreators.fetchCurrentProfile,
    schoolsActionCreators.fetchSchools,
    jobsActionCreators.fetchJobs,
  ]

  constructor(props) {
    super(props)
  }

  render() {
    const { jobs,
            profile,
            schools,
            jobActions,
            schoolActions,
          } = this.props;

    return (
      <div className={cx('about') + ' container'}>
        <Jobs 
          jobs={jobs} 
          onEditSave={jobActions.updateJob} 
          onJobSave={jobActions.createJob} 
          onJobDelete={jobActions.deleteJob} 
        />
        <Schools 
          schools={schools} 
          onEditSave={schoolActions.updateSchool} 
          onSchoolSave={schoolActions.createSchool} 
          onSchoolDelete={schoolActions.deleteSchool} 
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
    profile: state.profile.currentProfile
  };
}

function mapDispatchToProps (dispatch) {
  return {
    schoolActions: bindActionCreators(schoolsActionCreators, dispatch),
    jobActions: bindActionCreators(jobsActionCreators, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);