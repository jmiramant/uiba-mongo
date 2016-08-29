import React, { PropTypes } from 'react';
import update from 'react-addons-update'
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
import SchoolNameTypeahead from '../../containers/Typeahead';
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
    if (!this.isDataValid()) {
      this.props.saveSchoolEdit(this.state.school)
      this.toggleEdit()
    }
  }

  handleDelete () {
    this.props.handleDelete(this.state.school)
  }

  isDataValid() {
    // const validationResp = validateSchoolFormHelper(_.clone(intialSchoolState), this.state);
    // this.setState({validate: validationResp.error});
    // return containsErrors(validationResp.error)
    return false
  }
  
  handleSchoolName = e => {
    this.setState({
        school: {
          ...this.state.school,
          name : e
        }
    });
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

      if (['major', 'minor', 'degree'].includes(field)) {
        value = value.split(',');
      }

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

    const addComma = (v, i, ct) => {
      if ((i+1) === ct.length) {
        return v;
      } else {
        return v + ', ';
      }
    }

    if (this.state.edit) {

      return (
        <div className={cx('schoolItem--container')}>
          {errorMsgs}
          <div className={cx('schoolEdit--header')}>
            <SchoolNameTypeahead handleChange={this.handleSchoolName} />
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

          <input 
            type='text'
            value={this.state.school.major}
            onChange={this.handleChange('major')}
            className={ cx('schoolEdit--name')}
            id="major"  />

          <input 
            type='text'
            value={this.state.school.minor}
            onChange={this.handleChange('minor')}
            className={ cx('schoolEdit--name')}
            id="minor"  />
          <input 
            type='text'
            value={this.state.school.degree}
            onChange={this.handleChange('degree')}
            className={ cx('schoolEdit--name')}
            id="degree"  />

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
          
          { school.degree.length ? (
          <div>
            <h4>Degree{school.degree.length > 1 ? "s" : ''}:</h4>
            <p className={cx("schoolItem--date")}>{ school.degree.map( (d, i) => { return addComma(d, i, school.degree) }) } </p>
          </div>
          ) : (<span/>)}
          { school.major.length ? (
          <div>
            <h4>Major{school.major.length > 1 ? "s" : ''}:</h4>
            <p className={cx("schoolItem--date")}>{ school.major.map( (d, i) => { return addComma(d, i, school.major)  }) } </p>
          </div>
          ) : (<span/>)}
          { school.minor.length ? (
            <div>
              <h4>Minor{school.minor.length > 1 ? "s" : ''}:</h4>
              <p className={cx("schoolItem--date")}>{ school.minor.map( (d, i) => { return addComma(d, i, school.minor)  }) } </p>
            </div>
          ) : (<span/>)}
          <p className={cx("schoolItem--date")}>{moment(school.startDate).format('MMM, YYYY')} - { current ? ( 'Current' ) : ( moment(school.endDate).format('MMM, YYYY')) } </p>
          <div className={cx('schoolItem--spacer')}></div>
        </div>
      )

    }
  
  }
};