import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import SkillAdd from 'components/skills/SkillAdd';

import { containsErrors } from '../helpers/CommonFormValidations';
import { validateSkillHelper } from '../helpers/skillValidations';

import Select from 'react-select';
import Chip from 'material-ui/Chip';
import Popover from 'material-ui/Popover';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import styles from 'css/components/profile/skill';
import moment from 'moment';

const cx = classNames.bind(styles);

export default class SkillItem extends React.Component {
  
  static propTypes = {
    skill: PropTypes.object.isRequired,
    skillChange: PropTypes.func.isRequired,
    saveSkillEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  state = {
    edit: false
  }

  toggleEdit () {
    this.setState({edit: !this.state.edit})
  }
  
  validate() {
    const validationResp = validateSkillHelper(this.props.skill, this.state);
    this.setState({validationErrors: validationResp.error});
    return containsErrors(validationResp.error);
  }

  saveEdit (skill) {
    if (!this.validate()) {
      this.props.saveSkillEdit(skill)
      this.toggleEdit()
    }
  }

  handleDelete () {
    this.props.handleDelete(this.props.skill)
  }

  render () {
    const { 
            isntLast, 
            skill, 
            skillChange
          } = this.props;

    if (this.state.edit) {

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
        <Chip className={cx('skillItem--chip')}>
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
      )

    }
  
  }
};