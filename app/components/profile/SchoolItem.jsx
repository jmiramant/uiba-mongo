import React, { PropTypes } from 'react';
import update from 'react-addons-update'
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import moment from 'moment';

const cx = classNames.bind(styles);
const intialSchoolState = {
    name: '', 
    major: [],
    minor: [],
    degree: [],
    startDate: '',
    endDate: '',
    current: false
  }

export default class SchoolItem extends React.Component {
  
  static propTypes = {
    saveSchoolEdit: PropTypes.func,
    handleDelete: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  state = {
    school: { ...this.props.school }, 
    current: this.props.school.current,
    persistedSchool: { ...this.props.school }, 
    edit: false,
    validate: _.clone(intialSchoolState)
  }

  toggleEdit () {
    if (this.state.edit) {
      this.setState({school: this.state.persistedSchool})
    }

    this.setState({edit: !this.state.edit})

  }

  saveEdit () {
    if (!this.validate()) {
      this.props.saveSchoolEdit(this.state.school)
      this.toggleEdit()
    }
  }

  handleDelete () {
    this.props.handleDelete(this.state.school)
  }

  validate() {
    const validationResp = validateSchoolFormHelper(_.clone(intialSchoolState), this.state);
    this.setState({validate: validationResp.error});
    return containsErrors(validationResp.error)
  }
  
  handleChange = field => e => {
    var value = e.target.value
    if (e.target.type === 'checkbox') {
      value = this.state.current
      this.setState({
        current: !this.state.current,
        school: {
            ...this.state.school,
          [field] : !this.state.current
        }
      })
    } else {
      this.setState({
          school: {
            ...this.state.school,
          [field] : value
          }
      });
    }
  }

  formatDateString(date) {
    return moment(new Date(date)).format('YYYY-MM-DD')
  };


  render () {
    const { isntLast, school } = this.props;
    const { validate, current } = this.state;

    const errorMsgs = _.reject(validate, (v,k) => {
      return v === '';
    })

    if (this.state.edit) {

      return (
        <div className={cx('schoolItem--container')}>
          {errorMsgs}
          <div className={cx('schoolEdit--header')}>
            <input 
              type='text'
              value={this.state.school.name}
              onChange={this.handleChange('name')}
              className={ cx('schoolEdit--name')}
              id="name"  />
              | 
          </div>
          <input 
            type="date"
            value={this.formatDateString(this.state.school.startDate)} 
            onChange={this.handleChange('startDate')}
            className={cx('schoolEdit--startDate')}
            id="startDate" />
          { !current ? (
            <input 
              type="date"
              value={this.formatDateString(this.state.school.endDate)} 
              onChange={this.handleChange('endDate')} 
              className={cx('schoolEdit--endDate')}
              id="endDate" />
            ) : (<span />)
          }
          <input 
            type="checkbox"
            checked={current}
            onChange={this.handleChange('current')} />
          <div className={ cx('schoolEdit--controls') }>
            <div className={ cx('schoolEdit--buttons') + ' pull-left'} onClick={this.toggleEdit.bind(this)}>Close</div>
            <div className={ cx('schoolEdit--buttons', 'schoolEdit--button-delete')} onClick={this.handleDelete.bind(this)}>Delete</div>
            <div className={ cx('schoolEdit--buttons') + ' pull-right'} onClick={this.saveEdit.bind(this)}>Save</div>
          </div>
          <div className={cx('schoolItem--spacer')}></div>
        </div>
      )
    
    } else {

      return (
        <div className={cx('schoolItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          <div onClick={this.toggleEdit.bind(this)} className={cx('schoolItem--edit')}></div>
          <p className={cx("jobItem--header")}><span className={ cx('jobItem--name')}>{school.name}</span></p>
          <p className={cx("schoolItem--date")}>{ school.degree.map( (d) => { return d }) } - {school.major.map( (d) => { return d })}</p>
          <p className={cx("schoolItem--date")}>{moment(school.startDate).format('MMM, YYYY')} - { current ? ( 'Current' ) : ( moment(school.endDate).format('MMM, YYYY')) } </p>
          <div className={cx('schoolItem--spacer')}></div>
        </div>
      )

    }
  
  }
};