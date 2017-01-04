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
import RadarChart from 'components/d3/chart';
import Measure from 'react-measure';

import classNames from 'classnames/bind';
import styles from 'css/components/applicantShow';

const cx = classNames.bind(styles);

class ApplicantShow extends React.Component {

  state = {
    dimensions: {width: 0}
  }

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

    const { dimensions } = this.state;

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

            <div className='col-md-4 col-md-offset-2'>
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

            <div className='col-md-4'>
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
              <Measure
                onMeasure={(dimensions) => {
                  this.setState({dimensions})
                }}
              >
                <UibaCardHeader
                  style='xray'
                  text='Knowledge, Skills, Abilities'
                />
              </Measure>

              <RadarChart
                points={skills}
                style={{width: dimensions.width * 0.65, height: dimensions.width * 0.5}}
              />

                {skills.length === 0 ? (
                  <div className={cx('null-info')}>{applicant.firstName} hasn't added any items in the knowledge, skills, and abilities section.</div>
                ) : (
                <div>
                  {skills.map((skill, i) => {
                    return (
                      <SkillItem key={skill.type + i} skill={skill} />
                    )
                  })}
                </div>
              )}
            </div>
          
            <div className='col-md-4 col-md-offset-2'>
              <UibaCardHeader
                style='xray'
                text='Languages'
              />
                {languages.length === 0 ? (
                  <div className={cx('null-info')}>{applicant.firstName} hasn't added any items in the language section.</div>
                ) : (
                <div className={cx('language-container')}>
                  {languages.map((language, i) => {
                    return (
                      <LanguageItem key={language + i} language={language} />
                    )
                  })}
                </div>
              )}
            </div>

            <div className='col-md-4'>
              <UibaCardHeader
                style='xray'
                text='Interests'
              />
                {interests.length === 0 ? (
                  <div className={cx('null-info')}>{applicant.firstName} hasn't added any items in the interest section.</div>
                ) : (
                <div className={cx('interest-container')}>
                  {interests.map((interest, i) => {
                    return (
                      <InterestItem key={interest.interest + i} interest={interest} />
                    )
                  })}
                </div>
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
    interests: state.interest.interests,
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