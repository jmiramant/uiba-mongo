import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as skillsActionCreators from 'actions/skills';

import SkillCloud from 'components/skills/skillCloud';
import SkillItem from 'components/skills/SkillItem';
import SkillAdd from 'components/skills/SkillAdd';
import NullProfItem from 'components/ProfileNull';
import ErrorMessage from 'components/ErrorMessage';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import RadarChart from 'components/d3/chart';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import styles from 'css/components/profile/skill';
import classNames from 'classnames/bind';
import moment from 'moment';
const cx = classNames.bind(styles);

class SkillList extends React.Component {
  
  static propTypes = {
    skills: PropTypes.array,
    dimensions: PropTypes.obj,
    errorMessage: PropTypes.string,
    onSkillSave: PropTypes.func.isRequired,
    addVisible: PropTypes.bool.isRequired,
    toggleSkillAdd: PropTypes.func.isRequired,
    toggleSkillEdit: PropTypes.func.isRequired,
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

  toggleEditSkill = (skill) => {
    this.props.toggleSkillEdit(skill);
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
          dimensions,
          addVisible,
          inputFocus,
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
                    toggleEdit={this.toggleEditSkill.bind(this)}
                  />);
        })}
      </div>
    )

    return (
      <div className={cx('skillList--bootstrap-container')}>
        <div className={cx('skillList--container')}>

          <div className={cx('cta')}>
            <InfoIcon className={cx('info-icon')}/>
            <p className={cx('msg')}>Important: Please include all knowledge, skills, and abilities developed during your work and non-work experience. The more information Uiba has to work with, the more accurate the assessment of your ability to excel in this role.</p>
          </div>

          <RadarChart
            points={[skills]}
            style={{width: dimensions.width * 0.65, height: dimensions.width * 0.5}}
          />

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
            <SkillCloud 
              inputFocus={inputFocus}
            />
            <SkillAdd
              isEdit={false}
              skill={skill}
              onInputFocus={actions.handleInputFocus}
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
    skill: state.skill.skill,
    inputFocus: state.skill.inputFocus
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