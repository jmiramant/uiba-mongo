import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as jobsActionCreators from 'actions/jobs';
import * as schoolsActionCreators from 'actions/schools';
import * as skillsActionCreators from 'actions/skills';
import * as profileActionCreators from 'actions/profiles';
import * as languagesActionCreators from 'actions/languages';
import * as projectsActionCreators from 'actions/projects';

import Jobs from 'components/jobs/JobList';
import Schools from 'components/schools/SchoolList';
import Skills from 'components/skills/SkillList';
import Languages from 'components/language/LanguageList';
import Projects from 'components/projects/ProjectList';
import UserCard from 'components/userCard/UserCard';

import styles from 'css/components/profile';
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
            <Jobs 
              jobs={jobs.jobs} 
              addVisibile={jobs.addShow}
              toggleJobAdd={jobActions.toggleJobAdd}
              onEditSave={jobActions.updateJob} 
              onJobSave={jobActions.createJob} 
              onJobDelete={jobActions.deleteJob} 
            />
            <Schools 
              schools={schools.schools} 
              addVisibile={schools.addShow}
              toggleSchoolAdd={schoolActions.toggleSchoolAdd}
              onEditSave={schoolActions.updateSchool} 
              onSchoolSave={schoolActions.createSchool} 
              onSchoolDelete={schoolActions.deleteSchool} 
            />
            <Skills 
              skills={skills.skills}
              addVisibile={skills.add}
              toggleSkillAdd={skillActions.toggleSkillAdd}
              onEditSave={skillActions.updateSkill} 
              onSkillSave={skillActions.createSkill} 
              onSkillDelete={skillActions.deleteSkill} 
            />
            <Languages
              languages={languages.languages}
              addVisibile={languages.addShow}
              toggleLanguageAdd={languageActions.toggleLanguageAdd}
              onEditSave={languageActions.updateLanguage} 
              onLanguageSave={languageActions.createLanguage} 
              onLanguageDelete={languageActions.deleteLanguage} 
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