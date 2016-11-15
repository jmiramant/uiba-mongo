import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as usersActionCreators from 'actions/users';
import * as profilesActionCreators from 'actions/profiles';
import * as jobsActionCreators from 'actions/jobs';
import * as schoolsActionCreators from 'actions/schools';
import * as skillsActionCreators from 'actions/skills';
import * as profileActionCreators from 'actions/profiles';
import * as languagesActionCreators from 'actions/languages';
import * as projectsActionCreators from 'actions/projects';
import * as messagesActionCreators from 'actions/messages';
import * as interestsActionCreators from 'actions/interests';
import * as applyActionCreators from 'actions/apply';

import { mixpanelTrack } from 'middlewares/mixpanelTrackers';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card } from 'material-ui/Card';
import CardHeader from 'components/CardHeader';
import Jobs from 'components/jobs/JobList';
import Schools from 'components/schools/SchoolList';
import Skills from 'components/skills/SkillList';
import Languages from 'components/language/LanguageList';
import Interests from 'components/interests/InterestList';
import Projects from 'components/projects/ProjectList';
import ApplyBtn from 'components/ApplyBtn';
import UserCard from 'components/userCard/UserCard';
import Loading from 'components/Loading';

import styles from 'css/common/profile';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class Profile extends React.Component {

  componentWillMount() {
    const { profileActions,
            jobActions,
            userActions,
            schoolActions,
            skillActions,
            interestActions,
            languageActions,
            projectActions,
    } = this.props;

    profileActions.fetchProfile();
    schoolActions.fetchSchools();
    jobActions.fetchJobs();
    skillActions.fetchSkills();
    languageActions.fetchLanguages();
    projectActions.fetchProjects();
    interestActions.fetchInterests();
    userActions.fetchCurrentUser();

  }

  componentDidMount() {
    mixpanelTrack("PROFILE[load]:init")
  }

  constructor(props) {
    super(props)
  }

  handleApply () {
    this.props.applyActions.sumbitApplication(this.props.profile.profile)
  }

  isProfileLoaded(profile) {
    if (!profile.isFetching && Object.keys(profile.profile).length > 0) {
      profile.profile
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { profile,   profileActions,
            jobs,      jobActions,
            schools,   schoolActions,
            skills,    skillActions,
            interests, interestActions,
            languages, languageActions,
            projects, projectActions,
            messages, messageActions,
            applyActions,
          } = this.props;

    const profPage = (
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
                text='Projects and Volunteering'
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

            <div className='col-md-8 col-md-offset-2'>
              <CardHeader
                text='Interests'
                addVisible={interests.addShow}
                toggleAdd={interestActions.toggleInterestAdd}
              />
              <Interests
                interests={interests.interests}
                addVisible={interests.addShow}
                errorMessage={messages.errorMessage}
                toggleInterestAdd={interestActions.toggleInterestAdd}
                onEditSave={interestActions.updateInterest} 
                onInterestSave={interestActions.createInterest} 
                onInterestDelete={interestActions.deleteInterest} 
              />
            </div>

            {profile.profile.apply && (profile.profile.apply.applied || profile.profile.apply.applyComplete) ? (
              <div className='col-md-8 col-md-offset-2'>
                <ApplyBtn
                  applyState={profile.profile.apply}
                  handleSubmit={this.handleApply.bind(this)}
                />
              </div> 
            ) : (null)}

          </div>
        </div>
      </MuiThemeProvider>
    )

    return (
      this.isProfileLoaded(profile) ? (profPage) : (<Loading componentName='Profile'/>)
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
    messages: state.message,
    interests: state.interest
  };
}

function mapDispatchToProps (dispatch) {
  return {
    userActions: bindActionCreators(usersActionCreators, dispatch),
    profileActions: bindActionCreators(profilesActionCreators, dispatch),
    schoolActions: bindActionCreators(schoolsActionCreators, dispatch),
    jobActions: bindActionCreators(jobsActionCreators, dispatch),
    skillActions: bindActionCreators(skillsActionCreators, dispatch),
    languageActions: bindActionCreators(languagesActionCreators, dispatch),
    projectActions: bindActionCreators(projectsActionCreators, dispatch),
    messageActions: bindActionCreators(messagesActionCreators, dispatch),
    interestActions: bindActionCreators(interestsActionCreators, dispatch),
    applyActions: bindActionCreators(applyActionCreators, dispatch),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);