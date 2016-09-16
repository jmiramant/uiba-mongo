import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as profilesActionCreators from 'actions/profiles';
import * as jobsActionCreators from 'actions/jobs';
import * as schoolsActionCreators from 'actions/schools';
import * as skillsActionCreators from 'actions/skills';
import * as profileActionCreators from 'actions/profiles';
import * as languagesActionCreators from 'actions/languages';
import * as projectsActionCreators from 'actions/projects';
import * as messagesActionCreators from 'actions/messages';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card } from 'material-ui/Card';
import CardHeader from 'components/CardHeader';
import Jobs from 'components/jobs/JobList';
import Schools from 'components/schools/SchoolList';
import Skills from 'components/skills/SkillList';
import Languages from 'components/language/LanguageList';
import Projects from 'components/projects/ProjectList';
import UserCard from 'components/userCard/UserCard';

import styles from 'css/common/profile';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
require("css/lib/datepickerOverrides");

class Profile extends React.Component {
  static need = [  // eslint-disable-line
    profileActionCreators.fetchProfile,
    schoolsActionCreators.fetchSchools,
    jobsActionCreators.fetchJobs,
    skillsActionCreators.fetchSkills,
    languagesActionCreators.fetchLanguages,
    projectsActionCreators.fetchProjects,
  ]

  constructor(props) {
    super(props)
  }

  render() {
    const { profile,   profileActions,
            jobs,      jobActions,
            schools,   schoolActions,
            skills,    skillActions,
            languages, languageActions,
            projects, projectActions,
            messages, messageActions,
          } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <UserCard 
            editMode={profile.edit}
            profile={profile.profile} 
            toggleEdit={profileActions.toggleProfileEdit}
            onEditSave={profileActions.updateProfile} 
          />
          <div className={cx('about') + ' container'}>

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Knowledge, Skills, Abilities'
                addVisible={skills.addShow}
                toggleAdd={skillActions.toggleSkillAdd}
              />
              <Skills 
                skills={skills.skills}
                addVisible={skills.addShow}
                errorMessage={messages.errorMessage}
                toggleSkillAdd={skillActions.toggleSkillAdd}
                onEditSave={skillActions.updateSkill} 
                onSkillSave={skillActions.createSkill} 
                onSkillDelete={skillActions.deleteSkill} 
              />
            </div>
            
            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Employment'
                addVisible={jobs.addShow}
                toggleAdd={jobActions.toggleJobAdd}
              />
              <Jobs 
                jobs={jobs.jobs} 
                addVisible={jobs.addShow}
                toggleJobAdd={jobActions.toggleJobAdd}
                onEditSave={jobActions.updateJob} 
                onJobSave={jobActions.createJob} 
                onJobDelete={jobActions.deleteJob} 
              />
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Education'
                addVisible={schools.addShow}
                toggleAdd={schoolActions.toggleSchoolAdd}
              />
              <Schools 
                schools={schools.schools} 
                addVisible={schools.addShow}
                toggleSchoolAdd={schoolActions.toggleSchoolAdd}
                onEditSave={schoolActions.updateSchool} 
                onSchoolSave={schoolActions.createSchool} 
                onSchoolDelete={schoolActions.deleteSchool} 
              />
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Languages'
                addVisible={languages.addShow}
                toggleAdd={languageActions.toggleLanguageAdd}
              />
              <Languages
                languages={languages.languages}
                addVisible={languages.addShow}
                errorMessage={messages.errorMessage}
                toggleLanguageAdd={languageActions.toggleLanguageAdd}
                onEditSave={languageActions.updateLanguage} 
                onLanguageSave={languageActions.createLanguage} 
                onLanguageDelete={languageActions.deleteLanguage} 
              />
            </div>

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Projects'
                addVisible={projects.addShow}
                toggleAdd={projectActions.toggleProjectAdd}
              />
              <Projects
                projects={projects.projects}
                addVisible={projects.addShow}
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
    profile: state.profile,
    skills: state.skill,
    languages: state.language,
    projects: state.project,
    messages: state.message
  };
}

function mapDispatchToProps (dispatch) {
  return {
    profileActions: bindActionCreators(profilesActionCreators, dispatch),
    schoolActions: bindActionCreators(schoolsActionCreators, dispatch),
    jobActions: bindActionCreators(jobsActionCreators, dispatch),
    skillActions: bindActionCreators(skillsActionCreators, dispatch),
    languageActions: bindActionCreators(languagesActionCreators, dispatch),
    projectActions: bindActionCreators(projectsActionCreators, dispatch),
    messageActions: bindActionCreators(messagesActionCreators, dispatch),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);