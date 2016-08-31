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
        <div className={cx('about') + ' container'}>
          <Card>
            <CardHeader title="Profile" />
            <CardText>
              <UserCard profile={profile} />
            </CardText>
          </Card>
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
          <Languages
            languages={languages} 
            onEditSave={languageActions.updateLanguage} 
            onSave={languageActions.createLanguage} 
            onDelete={languageActions.deleteLanguage} 
          />
          <Projects
            projects={projects} 
            onEditSave={projectActions.updateProject} 
            onSave={projectActions.createProject} 
            onDelete={projectActions.deleteProject} 
          />
        </div>
      </MuiThemeProvider>
    );
  }
};

function mapStateToProps(state) {
  return {
    schools: state.school.schools,
    jobs: state.job.jobs,
    profile: state.profile.currentProfile,
    skills: state.skill.skills,
    languages: state.language.languages,
    projects: state.project.projects,
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