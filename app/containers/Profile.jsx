import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as jobsActionCreators from 'actions/jobs';
import * as schoolsActionCreators from 'actions/schools';
import * as skillsActionCreators from 'actions/skills';
import * as profileActionCreators from 'actions/profiles';
import * as languagesActionCreators from 'actions/languages';
import * as projectsActionCreators from 'actions/projects';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card } from 'material-ui/Card';
import CardHeader from 'components/cardHeader';
import Jobs from 'components/jobs/JobList';
import Schools from 'components/schools/SchoolList';
import Skills from 'components/skills/SkillList';
import Languages from 'components/language/LanguageList';
import Projects from 'components/projects/ProjectList';
import UserCard from 'components/userCard/UserCard';

import styles from 'css/common/profile';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class Profile extends Component {
  static need = [  // eslint-disable-line
    profileActionCreators.fetchCurrentProfile,
    schoolsActionCreators.fetchSchools,
    jobsActionCreators.fetchJobs,
    skillsActionCreators.fetchSkills,
    languagesActionCreators.fetchLanguages,
    projectsActionCreators.fetchProjects
  ]

  constructor(props) {
    super(props)
  }

  render() {
    const { profile,
            jobs,      jobActions,
            schools,   schoolActions,
            skills,    skillActions,
            languages, languageActions,
            projects, projectActions,
          } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <UserCard profile={profile} />
          <div className={cx('about') + ' container'}>
            
            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Employment'
                addVisibile={jobs.addShow}
                toggleAdd={jobActions.toggleJobAdd}
              />
              <Jobs 
                jobs={jobs.jobs} 
                addVisibile={jobs.addShow}
                toggleJobAdd={jobActions.toggleJobAdd}
                onEditSave={jobActions.updateJob} 
                onJobSave={jobActions.createJob} 
                onJobDelete={jobActions.deleteJob} 
              />
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Education'
                addVisibile={schools.addShow}
                toggleAdd={schoolActions.toggleSchoolAdd}
              />
              <Schools 
                schools={schools.schools} 
                addVisibile={schools.addShow}
                toggleSchoolAdd={schoolActions.toggleSchoolAdd}
                onEditSave={schoolActions.updateSchool} 
                onSchoolSave={schoolActions.createSchool} 
                onSchoolDelete={schoolActions.deleteSchool} 
              />
            </div>

            <div className='col-md-5 col-md-offset-2'>
              <CardHeader
                text='Skills'
                addVisibile={skills.addShow}
                toggleAdd={skillActions.toggleSkillAdd}
              />
              <Skills 
                skills={skills.skills}
                addVisibile={skills.addShow}
                toggleSkillAdd={skillActions.toggleSkillAdd}
                onEditSave={skillActions.updateSkill} 
                onSkillSave={skillActions.createSkill} 
                onSkillDelete={skillActions.deleteSkill} 
              />
            </div>

            <div className='col-md-3'>
              <CardHeader
                text='Languages'
                addVisibile={languages.addShow}
                toggleAdd={languageActions.toggleLanguageAdd}
              />
              <Languages
                languages={languages.languages}
                addVisibile={languages.addShow}
                toggleLanguageAdd={languageActions.toggleLanguageAdd}
                onEditSave={languageActions.updateLanguage} 
                onLanguageSave={languageActions.createLanguage} 
                onLanguageDelete={languageActions.deleteLanguage} 
              />
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Projects'
                addVisibile={projects.addShow}
                toggleAdd={projectActions.toggleProjectAdd}
              />
              <Projects
                projects={projects.projects}
                addVisibile={projects.addShow}
                toggleProjectAdd={projectActions.toggleProjectAdd}
                onEditSave={projectActions.updateProject} 
                onProjectSave={projectActions.createProject} 
                onProjectDelete={projectActions.deleteProject} 
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
};

function mapStateToProps(state) {
  return {
    schools: state.school,
    jobs: state.job,
    profile: state.profile.currentProfile,
    skills: state.skill,
    languages: state.language,
    projects: state.project,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    schoolActions: bindActionCreators(schoolsActionCreators, dispatch),
    jobActions: bindActionCreators(jobsActionCreators, dispatch),
    skillActions: bindActionCreators(skillsActionCreators, dispatch),
    languageActions: bindActionCreators(languagesActionCreators, dispatch),
    projectActions: bindActionCreators(projectsActionCreators, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);