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
import { validateSubmitHelper } from 'components/helpers/submitValidations';

import Scroll from 'react-scroll';
import styles from 'css/common/profile';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const scroll = Scroll.animateScroll;
var Element = Scroll.Element;
var scroller = Scroll.scroller;

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
  
  state = {
    validationErrors: {}
  }

  isValidated() {
    const errorStore = validateSubmitHelper(this.props, this.state.validationErrors);

    if (errorStore.containsErrors) {
      this.handleValidationErrors(errorStore.errors);
    }

    return errorStore.containsErrors;
  }

  handleApply () {
    if (!this.isValidated()) {
      // this.props.applyActions.sumbitApplication(this.props.profile.profile)
    } else {
    }
  }

  handleValidationErrors(errors) {
    this.setState({validationErrors: errors})

    if (errors.position === 'name') {
      this.props.messageActions.createMessage(errors.name);
    }

    scroller.scrollTo(errors.position, {
      duration: 1000,
      smooth: true,
    })
  }

  isProfileLoaded(profile) {
    if (!profile.isFetching && Object.keys(profile.profile).length > 0) {
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

    const { validationErrors } = this.state;
    
    const profPage = (
      <div>
        <Element name='name'>
          <UserCard 
            editMode={profile.edit}
            profile={profile.profile} 
            toggleEdit={profileActions.toggleProfileEdit}
            onEditSave={profileActions.updateProfile}
          />
        </Element>
        <div className={cx('alert-container')}>
          <div className={cx('alert')}>Applicants with detailed profiles are 94% more likely to be interviewed.</div>
        </div>
        <div className={cx('about') + ' container'}>
          <div className='col-md-8 col-md-offset-2'>
            <Element name="job">
              <CardHeader
                text='Employment'
                addVisible={jobs.addShow}
                toggleAdd={jobActions.toggleJobAdd}
                error={validationErrors.jobs}
              />
            </Element>
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
            <Element name="skill">
              <CardHeader
                text='Knowledge, Skills, Abilities'
                addVisible={skills.addShow}
                toggleAdd={skillActions.toggleSkillAdd}
                error={validationErrors.skills}
              />
            </Element>
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
            <Element name="school">
              <CardHeader
                text='Education'
                addVisible={schools.addShow}
                toggleAdd={schoolActions.toggleSchoolAdd}
                error={validationErrors.schools}
              />
            </Element>
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
            <Element name="interest">
              <CardHeader
                text='Interests'
                addVisible={interests.addShow}
                toggleAdd={interestActions.toggleInterestAdd}
                error={validationErrors.interests}
              />
            </Element>
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