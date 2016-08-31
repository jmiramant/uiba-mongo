import React, { PropTypes } from 'react';
import update from 'react-addons-update'
import classNames from 'classnames/bind';
import styles from 'css/components/profile/school';
import SchoolNameTypeahead from '../../containers/Typeahead';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import moment from 'moment';
import SchoolAdd from 'components/schools/SchoolAdd';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Divider from 'material-ui/Divider';

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
          <EditIcon
            color="#66747F"
            hoverColor="#f20253"
            onClick={this.toggleEdit.bind(this)}
            className='pull-right'
          />
          <div onClick={this.toggleEdit.bind(this)} className={cx('schoolItem--edit')}></div>
          <p className={cx("jobItem--header")}>{school.name} | { current ? ( 'Current' ) : ( moment(school.endDate).format('YYYY')) }</p>
          <p className={cx("schoolItem--date")}>{ school.major[0] } | { school.degree }</p>
          <Divider />
        </div>
      )

    }
  
  }
};