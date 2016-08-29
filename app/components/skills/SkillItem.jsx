import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import styles from 'css/components/profile/jobItem';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import moment from 'moment';

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
    validate: _.clone(intialSkillState)
  }

  toggleEdit () {
    if (this.state.edit) {
      this.setState({skill: this.state.persistedSkill})
    }

    this.setState({edit: !this.state.edit})

  }

  saveEdit () {
    if (!this.isDataValid()) {
      this.props.saveSkillEdit(this.state.skill)
      this.toggleEdit()
    }
  }

  handleDelete () {
    this.props.handleDelete(this.state.skill)
  }

  isDataValid() {
    // const validationResp = validateSkillFormHelper(_.clone(intialSkillState), this.state);
    // this.setState({validate: validationResp.error});
    // return containsErrors(validationResp.error)
    return false
  }
  
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
        <div className={cx('skillItem--container')}>
          {errorMsgs}

          <input 
            type='text'
            value={this.state.skill.type}
            onChange={this.handleChange('type')}
            className={ cx('skillEdit--name')}
            id="type"  />

          <Select
              name="proficiency"
              value="one"
              options={proficiency}
              onChange={this.handleChange('proficiency')}
          />

          <Select
              name="lengthOfUse"
              value="one"
              options={lengthOfUse}
              onChange={this.handleChange('lengthOfUse')}
          />

          <Select
              name="frequency"
              value="one"
              options={frequency}
              onChange={this.handleChange('frequency')}
          />

          <div className={ cx('skillEdit--controls') }>
            <div className={ cx('skillEdit--buttons') + ' pull-left'} onClick={this.toggleEdit.bind(this)}>Close</div>
            <div className={ cx('skillEdit--buttons', 'skillEdit--button-delete')} onClick={this.handleDelete.bind(this)}>Delete</div>
            <div className={ cx('skillEdit--buttons') + ' pull-right'} onClick={this.saveEdit.bind(this)}>Save</div>
          </div>
          <div className={cx('skillItem--spacer')}></div>
        </div>
      )
    
    } else {

      return (
        <div className={cx('skillItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          <div onClick={this.toggleEdit.bind(this)} className={cx('skillItem--edit')}></div>
          <p className={cx("jobItem--header")}><span className={ cx('jobItem--name')}>{skill.type}</span></p>
          
          <div>
            <div>Frequency</div>
            <p className={cx("skillItem--frequency")}>{ skill.frequency } </p>
          </div>

          <div>
            <div>Length of Use</div>
            <p className={cx("skillItem--length")}>{ skill.lengthOfUse } </p>
          </div>
          <div>
            <div>Proficiency</div>
            <p className={cx("skillItem--proficiency")}>{ skill.proficiency } </p>
          </div>

          <div className={cx('skillItem--spacer')}></div>
        </div>
      )

    }
  
  }
};