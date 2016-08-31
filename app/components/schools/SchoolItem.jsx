import React, { PropTypes } from 'react';
import update from 'react-addons-update'
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
import SchoolNameTypeahead from '../../containers/Typeahead';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import moment from 'moment';
import SchoolAdd from 'components/schools/SchoolAdd';

const cx = classNames.bind(styles);
const intialSchoolState = {
    name: '', 
    major: '',
    minor: '',
    degree: '',
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
    this.setState({edit: !this.state.edit})
  }

  saveEdit (school) {
    this.props.saveSchoolEdit(school)
    this.toggleEdit()
  }

  handleDelete () {
    this.props.handleDelete(this.state.school)
  }

  render () {
    const { isntLast, school } = this.props;
    const { validate, current } = this.state;

    const addComma = (v, i, ct) => {
      if ((i+1) === ct.length) {
        return v;
      } else {
        return v + ', ';
      }
    }
    
    if (this.state.edit) {

      return (
        <SchoolAdd
          addVisibile={false}
          onSchoolSave={this.saveEdit.bind(this)}
          school={this.state.school}
          handleDelete={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)}
        />
      )
    
    } else {

      return (
        <div className={cx('schoolItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          <div onClick={this.toggleEdit.bind(this)} className={cx('schoolItem--edit')}></div>
          <p className={cx("jobItem--header")}><span className={ cx('jobItem--name')}>{school.name}</span></p>
          
          { school.degree.length ? (
          <div>
            <h4>Degree{school.degree.length > 1 ? "s" : ''}:</h4>
            <p className={cx("schoolItem--date")}>{ school.degree } </p>
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