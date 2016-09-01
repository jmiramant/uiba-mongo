import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as skillsActionCreators from 'actions/skills';

import SkillItem from 'components/skills/SkillItem';
import SkillAdd from 'components/skills/SkillAdd';
import NullProfItem from 'components/ProfileNull';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import styles from 'css/components/profile/skill';
import classNames from 'classnames/bind';
import moment from 'moment';
const cx = classNames.bind(styles);

class SkillList extends React.Component {
  
  static propTypes = {
    skills: PropTypes.array,
    onSkillSave: PropTypes.func.isRequired,
    addVisibile: PropTypes.bool.isRequired,
    toggleSkillAdd: PropTypes.func.isRequired,
    onEditSave: PropTypes.func.isRequired,
    onSkillDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }
  
  toggleAddSkill = () => {
    this.props.toggleSkillAdd(this.props.addVisibile)
  }

  handleSave = (data) => {
    this.props.onSkillSave(data);
    this.props.toggleSkillAdd(this.props.addVisibile)
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (skill) => {
    this.props.onSkillDelete(skill);
  }

  render () {
    const { skill,
            skills,
            addVisibile,
            actions,
          } = this.props;
    const lengthIndex = skills.length - 1;
    const renderItems = (
      <div>
        {skills.map((skill, i) => {
          return (<SkillItem 
                    key={skill._id} 
                    skill={skill} 
                    skillChange={actions.skillsChange}
                    handleDelete={this.handleDelete}
                    saveSkillEdit={this.handleEditSave} 
                    isntLast={lengthIndex !== i} 
                  />);
        })}
      </div>
    )

    return (
      <div className={cx('skillList--container') + ' col-md-8 col-md-offset-2'}>
        { skills.length ? (
          <div>
            {renderItems}
          </div>
        ) : (
          <span>
            <NullProfItem target="skill" />
          </span>
        )}
        { addVisibile ? (
          <SkillAdd
            skill={skill}
            skillChange={actions.skillChange}
            toggleEdit={this.toggleAddSkill.bind(this)} 
            addVisibile={addVisibile} 
            onSkillSave={this.handleSave} 
          />
        ) : (
          <FloatingActionButton 
            onClick={this.toggleAddSkill}
            className={cx('schoolItem--add') + ' pull-right'}
            mini={true}
          >
            <AddIcon />
          </FloatingActionButton>
        ) }
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