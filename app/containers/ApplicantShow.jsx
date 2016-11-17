import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router'

import * as jobsActionCreators from 'actions/jobs';
import * as schoolsActionCreators from 'actions/schools';
import * as skillsActionCreators from 'actions/skills';
import * as applicantActionCreators from 'actions/applicants';
import * as languagesActionCreators from 'actions/languages';
import * as projectsActionCreators from 'actions/projects';
import * as interestsActionCreators from 'actions/interests';

import CardHeader from 'components/CardHeader';
import SchoolItem from 'components/applicants/SchoolItem';
import JobItem from 'components/applicants/JobItem';
import LanguageItem from 'components/applicants/LanguageItem';
import SkillItem from 'components/applicants/SkillItem';
import ProjectItem from 'components/applicants/ProjectItem';
import InterestItem from 'components/applicants/InterestItem';

import classNames from 'classnames/bind';
import styles from 'css/components/applicantShow';

const cx = classNames.bind(styles);

export default class ApplicantShow extends React.Component {

  componentWillMount() {
    const { params,
            applicantActions,
            jobActions,
            schoolActions,
            skillActions,
            interestActions,
            languageActions,
            projectActions,
    } = this.props;

    applicantActions.fetchApplicant(params.profId)
    schoolActions.fetchSchools(params.profId);
    jobActions.fetchJobs(params.profId);
    skillActions.fetchSkills(params.profId);
    languageActions.fetchLanguages(params.profId);
    projectActions.fetchProjects(params.profId);
    interestActions.fetchInterests(params.profId);
  }

  render() {
    
    const {
      applicant,
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
          <p className={cx('name')}>{applicant.firstName} {applicant.lastName}</p>

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Education'
              />
              {schools.length === 0 ? (
                <div>{applicant.firstName} hasn't added any items in the education section.</div>
              ) : (
                <span>
                {schools.map((school) => {
                  return (
                    <SchoolItem school={school} />
                  )
                })}
                </span>
              )}
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Employment'
              />
                {jobs.length === 0 ? (
                  <div>{applicant.firstName} hasn't added any items in the education section.</div>
                ) : (
                <span>
                  {jobs.map((job) => {
                    return (
                      <JobItem job={job} />
                    )
                  })}
                </span>
              )}
            </div>
          
            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Knowledge, Skills, Abilities'
              />
                {skills.length === 0 ? (
                  <div>{applicant.firstName} hasn't added any items in the education section.</div>
                ) : (
                <span>
                  {skills.map((skill) => {
                    return (
                      <SkillItem skill={skill} />
                    )
                  })}
                </span>
              )}
            </div>
          
            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Languages'
              />
                {languages.length === 0 ? (
                  <div>{applicant.firstName} hasn't added any items in the education section.</div>
                ) : (
                <span>
                  {languages.map((language) => {
                    return (
                      <LanguageItem language={language} />
                    )
                  })}
                </span>
              )}
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Projects'
              />
                {projects.length === 0 ? (
                  <div>{applicant.firstName} hasn't added any items in the education section.</div>
                ) : (
                <span>
                  {projects.map((project) => {
                    return (
                      <ProjectItem project={project} />
                    )
                  })}
                </span>
              )}
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Interests'
              />
                {interests.length === 0 ? (
                  <div>{applicant.firstName} hasn't added any items in the education section.</div>
                ) : (
                <span>
                  {interests.map((interest) => {
                    return (
                      <InterestItem interest={interest} />
                    )
                  })}
                </span>
              )}
            </div>

        </div>
      </div>
    )

  }
};

ApplicantShow.propTypes = {
};

function mapStateToProps(state) {
  return {
    applicant: state.applicant.applicant,
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
    applicantActions: bindActionCreators(applicantActionCreators, dispatch),

  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ApplicantShow);