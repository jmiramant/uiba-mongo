import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as skillsActionCreators from 'actions/skills';

import SkillItem from 'components/skills/SkillItem';
import SkillAdd from 'components/skills/SkillAdd';
import NullProfItem from 'components/ProfileNull';
import ErrorMessage from 'components/ErrorMessage';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import styles from 'css/components/profile/skill';
import classNames from 'classnames/bind';
import moment from 'moment';
const cx = classNames.bind(styles);

class SkillList extends React.Component {
  
  static propTypes = {
    skills: PropTypes.array,
    errorMessage: PropTypes.string,
    onSkillSave: PropTypes.func.isRequired,
    addVisible: PropTypes.bool.isRequired,
    toggleSkillAdd: PropTypes.func.isRequired,
    onEditSave: PropTypes.func.isRequired,
    onSkillDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }
  
  toggleAddSkill = () => {
    let {
      addVisible,
      skill,
      toggleSkillAdd
    } = this.props

    this.props.toggleSkillAdd(this.props.addVisible, skill)
  }

  handleSave = (data) => {
    let {
      addVisible,
      skill,
      toggleSkillAdd,
      onSkillSave
    } = this.props
    
    onSkillSave(data);
    toggleSkillAdd(addVisible, skill)
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (skill) => {
    this.props.onSkillDelete(skill);
  }

  render () {
    let { skill,
            skills,
            addVisible,
            actions,
            errorMessage,
          } = this.props;

    const listClass = classNames({
      [cx('horizontal')]: true,
      [cx('left')]: true,
      [cx('split')]: addVisible,
    });

    const addClass = classNames({
      [cx('horizontal')]: true,
      [cx('left-border')]: addVisible,
      [cx('right')]: true,
      [cx('no-items')]: skills.length === 0,
      [cx('split')]: addVisible,
    });

    const renderItems = (
      <div>
        {skills.map((skill, i) => {
          return (<SkillItem 
                    key={skill._id} 
                    skill={skill} 
                    skillChange={actions.skillsChange}
                    handleDelete={this.handleDelete}
                    saveSkillEdit={this.handleEditSave} 
                  />);
        })}
      </div>
    )

    return (
      <div className={cx('skillList--bootstrap-container')}>
        <div className={cx('skillList--container')}>

          <div className={cx('cta')}>
            <InfoIcon className={cx('info-icon')}/>
            <p className={cx('msg')}>This section is the core of your profile. Please include all knowledge, skills, & abilities developed during your work and non-work experience, whether you believe they are relevant or not. Your assessment takes everything into account.</p>
          </div>

          { skills.length ? (
            <div className={listClass}>
              {renderItems}
            </div>
          ) : (
            <span>
              <NullProfItem target="skill" />
            </span>
          )}
          
          <div className={addClass}>
            <ErrorMessage 
              errorText={errorMessage}
            />
            <SkillAdd
              isEdit={false}
              skill={skill}
              skillChange={actions.skillChange}
              toggleEdit={this.toggleAddSkill.bind(this)} 
              addVisible={addVisible} 
              onSkillSave={this.handleSave} 
            />
          </div>

        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    skill: state.skill.skill
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(skillsActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillList);