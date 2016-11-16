import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router'

import * as jobsActionCreators from 'actions/jobs';
import * as schoolsActionCreators from 'actions/schools';
import * as skillsActionCreators from 'actions/skills';
import * as profileActionCreators from 'actions/profiles';
import * as languagesActionCreators from 'actions/languages';
import * as projectsActionCreators from 'actions/projects';
import * as interestsActionCreators from 'actions/interests';

import classNames from 'classnames/bind';
import styles from 'css/components/applicantShow';

const cx = classNames.bind(styles);

export default class ApplicantShow extends React.Component {

  componentWillMount() {
    const { params,
            profileActions,
            jobActions,
            schoolActions,
            skillActions,
            interestActions,
            languageActions,
            projectActions,
    } = this.props;

    profileActions.fetchProfile()
    schoolActions.fetchSchools(params.profId);
    jobActions.fetchJobs(params.profId);
    skillActions.fetchSkills(params.profId);
    languageActions.fetchLanguages(params.profId);
    projectActions.fetchProjects(params.profId);
    interestActions.fetchInterests(params.profId);
  }

  render() {
    
    const {
      profile,
      jobs,
      languages,
      skills,
      projects,
      schools,
      interests
    } = this.props;

    return (
      <div>
        <h4>User Profile</h4>
        <div className={cx('applicant-container')}>
          <p className={cx('name')}>{profile.firstName} {profile.lastName}</p>


          {schools.map((school) => {
            return (
              <div key={school.name}>{school.name}</div>
            )
          })}

          {jobs.map((job) => {
            return (
              <div key={job.title}>{job.title}</div>
            )
          })}
          
          {skills.map((skill) => {
            return (
              <div key={skill.type}>{skill.type}</div>
            )
          })}

          {languages.map((language) => {
            return (
              <div key={language.language}>{language.language}</div>
            )
          })}

          {projects.map((project) => {
            return (
              <div key={project.name}>{project.name}</div>
            )
          })}

          {interests.map((interest) => {
            return (
              <div key={interest.interest}>{interest.interest}</div>
            )
          })}
        </div>
      </div>
    )

  }
};

ApplicantShow.propTypes = {
};

function mapStateToProps(state) {
  return {
    profile: state.profile.profile,
    schools: state.school.schools,
    jobs: state.job.jobs,
    skills: state.skill.skills,
    languages: state.language.languages,
    projects: state.project.projects,
    interests: state.interest.interests
  };
}

function mapDispatchToProps (dispatch) {
  return {
    schoolActions: bindActionCreators(schoolsActionCreators, dispatch),
    jobActions: bindActionCreators(jobsActionCreators, dispatch),
    skillActions: bindActionCreators(skillsActionCreators, dispatch),
    languageActions: bindActionCreators(languagesActionCreators, dispatch),
    projectActions: bindActionCreators(projectsActionCreators, dispatch),
    interestActions: bindActionCreators(interestsActionCreators, dispatch),
    profileActions: bindActionCreators(profileActionCreators, dispatch),

  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ApplicantShow);