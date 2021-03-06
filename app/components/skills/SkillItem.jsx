import React, { PropTypes } from 'react';

import SkillAdd from 'components/skills/SkillAdd';

import Chip from 'material-ui/Chip';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/skill';
const cx = classNames.bind(styles);

export default class SkillItem extends React.Component {
  
  static propTypes = {
    skill: PropTypes.object.isRequired,
    skillChange: PropTypes.func.isRequired,
    saveSkillEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  toggleEdit () {
    this.props.toggleEdit(this.props.skill);
  }
  
  saveEdit (skill) {
    this.props.saveSkillEdit(skill)
    this.toggleEdit()
  }

  handleDelete () {
    this.props.handleDelete(this.props.skill)
  }

  render () {
    const { 
            isntLast, 
            skill, 
            style,
            skillChange,
            errorMessage,
          } = this.props;

    if (skill.edit) {

      return (
        <SkillAdd
          skill={skill}
          skillChange={skillChange}
          onSkillSave={this.saveEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)}
        />
      )
    
    } else {

      return (
        <div className={cx('chip-container')}>
        
          <Chip className={cx('skillItem--chip')}
            labelStyle={style}
          >
            {skill.type} 
            <span 
              onClick={this.toggleEdit.bind(this)}
              className={cx('skillItem--editBg')}
            >
              <EditIcon
                color='#E0E0E0'
                className={cx('skillItem--editIcon')}
              />
            </span>
          </Chip>
        </div>
      )

    }
  
  }
};