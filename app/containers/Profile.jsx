import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as jobsActionCreators from 'actions/jobs';
import * as schoolsActionCreators from 'actions/schools';
import * as skillsActionCreators from 'actions/skills';
import * as profileActionCreators from 'actions/profiles';

import Jobs from 'components/profile/JobList';
import Schools from 'components/profile/SchoolList';
import Skills from 'components/profile/SkillList';
import UserCard from 'components/profile/UserCard';

import styles from 'css/components/profile';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class Profile extends Component {
  static need = [  // eslint-disable-line
    profileActionCreators.fetchCurrentProfile,
    schoolsActionCreators.fetchSchools,
    jobsActionCreators.fetchJobs,
    skillsActionCreators.fetchSkills,
  ]

  constructor(props) {
    super(props)
  }

  render() {
    const { jobs,
            profile,
            schools,
            skills,
            jobActions,
            skillActions,
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
        <Skills 
          skills={skills} 
          onEditSave={skillActions.updateSkill} 
          onSkillSave={skillActions.createSkill} 
          onSkillDelete={skillActions.deleteSkill} 
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
    skills: state.skill.skills
  };
}

function mapDispatchToProps (dispatch) {
  return {
    schoolActions: bindActionCreators(schoolsActionCreators, dispatch),
    jobActions: bindActionCreators(jobsActionCreators, dispatch),
    skillActions: bindActionCreators(skillsActionCreators, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);