import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import Select from 'react-select';
import Chip from 'material-ui/Chip';
import Popover from 'material-ui/Popover';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import styles from 'css/components/profile/skill';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import moment from 'moment';
import SkillAdd from 'components/skills/SkillAdd';

const cx = classNames.bind(styles);
const intialSkillState = {
  type: '', 
  proficiency: '',
  lengthOfUse: '',
  frequency: '',
}

const proficiency = [
  {label: 'Learning', value: 'learning'},
  {label: 'Intermediate', value: 'intermediate'},
  {label: 'Competent', value: 'competent'},
  {label: 'Expert', value: 'expert'}
];  

const lengthOfUse = [
  {label: 'Less Than 1 Year', value: 0},
  {label: '1-3 Years', value: 1},
  {label: '3-5 Years', value: 3},
  {label: '5-10 Years', value: 5},
  {label: 'More Than 10 Years', value: 10}
];  

const frequency = [
  {label: 'Daily', value: 'daily'},
  {label: 'Weekly', value: 'weekly'},
  {label: 'Monthly', value: 'monthly'},
  {label: 'Yearly', value: 'yearly'}
]; 

export default class SkillItem extends React.Component {
  
  static propTypes = {
    saveSkillEdit: PropTypes.func,
    handleDelete: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  state = {
    skill: { ...this.props.skill }, 
    current: this.props.skill.current,
    persistedSkill: { ...this.props.skill }, 
    edit: false,
    validate: _.clone(intialSkillState),
    open: false
  }

  toggleEdit () {
    if (this.state.edit) {
      this.setState({skill: this.state.persistedSkill})
    }

    this.setState({edit: !this.state.edit})

  }

  saveEdit (skill) {
    this.props.saveSkillEdit(skill)
    this.toggleEdit()
  }

  handleDelete () {
    this.props.handleDelete(this.state.skill)
  }

  handleHover = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  
  handleRequestClose = (e) => {
    this.setState({
      open: false,
    });  
  };
  
  handleChange = field => e => {
    
    let value;
    if (e.target) {
      value = e.target.value      
    } else {
      value = e.value
    }

    this.setState({
        skill: {
          ...this.state.skill,
        [field] : value
        }
    });
  }

  formatDateString(date) {
    return moment(new Date(date)).format('YYYY-MM-DD')
  };


  render () {
    const { isntLast, skill } = this.props;
    const { validate } = this.state;

    const errorMsgs = _.reject(validate, (v,k) => {
      return v === '';
    })

    const addComma = (v, i, ct) => {
      if ((i+1) === ct.length) {
        return v;
      } else {
        return v + ', ';
      }
    }

    if (this.state.edit) {

      return (
        <SkillAdd
          onSkillSave={this.saveEdit.bind(this)}
          skill={this.state.skill}
          handleDelete={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)}
        />
      )
    
    } else {

      return (
        <Chip>
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