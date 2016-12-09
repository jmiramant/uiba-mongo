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

import {Card, CardHeader} from 'material-ui/Card';
import DefaultUserIcon from 'material-ui/svg-icons/action/account-circle';
import UibaCardHeader from 'components/CardHeader';
import SchoolItem from 'components/applicants/SchoolItem';
import JobItem from 'components/applicants/JobItem';
import LanguageItem from 'components/applicants/LanguageItem';
import SkillItem from 'components/applicants/SkillItem';
import ProjectItem from 'components/applicants/ProjectItem';
import InterestItem from 'components/applicants/InterestItem';

import classNames from 'classnames/bind';
import styles from 'css/components/applicantShow';

const cx = classNames.bind(styles);

class ApplicantShow extends React.Component {

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
        <div className={cx('applicant-container')}>

          <Card className='col-md-8 col-md-offset-2' style={{boxShadow: 'none'}}>
            <CardHeader
              className={cx('card-header')}
              titleColor={'#fff'}
              style={{margin: '0'}}
              title={applicant.firstName  + ' ' + applicant.lastName}
              avatar={applicant.picture || <DefaultUserIcon/>}
              titleStyle={{fontSize: '20px'}}
            />
          </Card>
          <p className={cx('name')}></p>

            <div className='col-md-8 col-md-offset-2'>
              <UibaCardHeader
                style='xray'
                text='Education'
              />
              {schools.length === 0 ? (
                <div className={cx('null-info')}>{applicant.firstName} hasn't added any items in the education section.</div>
              ) : (
                <span>
                {schools.map((school, i) => {
                  return (
                    <SchoolItem key={school.name + i} school={school} />
                  )
                })}
                </span>
              )}
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <UibaCardHeader
                style='xray'
                text='Employment'
              />
                {jobs.length === 0 ? (
                  <div className={cx('null-info')}>{applicant.firstName} hasn't added any items in the employment section.</div>
                ) : (
                <span>
                  {jobs.map((job, i) => {
                    return (
                      <JobItem key={job.title + i} job={job} />
                    )
                  })}
                </span>
              )}
            </div>
          
            <div className='col-md-8 col-md-offset-2'>
              <UibaCardHeader
                style='xray'
                text='Knowledge, Skills, Abilities'
              />
                {skills.length === 0 ? (
                  <div className={cx('null-info')}>{applicant.firstName} hasn't added any items in the knowledge, skills, and abilities section.</div>
                ) : (
                <span>
                  {skills.map((skill, i) => {
                    return (
                      <SkillItem key={skill.type + i} skill={skill} />
                    )
                  })}
                </span>
              )}
            </div>
          
            <div className='col-md-8 col-md-offset-2'>
              <UibaCardHeader
                style='xray'
                text='Languages'
              />
                {languages.length === 0 ? (
                  <div className={cx('null-info')}>{applicant.firstName} hasn't added any items in the language section.</div>
                ) : (
                <span>
                  {languages.map((language, i) => {
                    return (
                      <LanguageItem key={language + i} language={language} />
                    )
                  })}
                </span>
              )}
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <UibaCardHeader
                style='xray'
                text='Projects'
              />
                {projects.length === 0 ? (
                  <div className={cx('null-info')}>{applicant.firstName} hasn't added any items in the project section.</div>
                ) : (
                <span>
                  {projects.map((project, i) => {
                    return (
                      <ProjectItem key={project.name + i} project={project} />
                    )
                  })}
                </span>
              )}
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <UibaCardHeader
                style='xray'
                text='Interests'
              />
                {interests.length === 0 ? (
                  <div className={cx('null-info')}>{applicant.firstName} hasn't added any items in the interest section.</div>
                ) : (
                <span>
                  {interests.map((interest, i) => {
                    return (
                      <InterestItem key={interest.interest + i} interest={interest} />
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