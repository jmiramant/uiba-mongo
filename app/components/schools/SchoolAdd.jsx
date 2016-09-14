import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import SchoolNameTypeahead from '../../containers/Typeahead';

import { validateSchoolHelper } from '../helpers/schoolValidations';

import TextField from 'material-ui/TextField';
import DatePicker from 'lib/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import 'react-widgets/lib/less/react-widgets.less';

import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(moment)

import _ from 'lodash';

import styles from 'css/components/profile/school';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default class SchoolAdd extends React.Component {

  static propTypes = {
    school: PropTypes.object.isRequired,
    schoolChange: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    addVisible: PropTypes.bool,
    onSchoolSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  state = {
    validationErrors: {},
  }
  
  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {
      this.props.onSchoolSave(this.props.school);
    }
  }
  
  validate() {
    const validationResp = validateSchoolHelper(this.props.school, this.state.validationErrors);
    this.setState({validationErrors: validationResp.errors});
    return validationResp.containsErrors;
  }

  changeSchoolProps(field, value) {
    this.props.schoolChange({
      field: field,
      value: value,
      id: this.props.school._id
    });  
  }
  
  handleSchoolName = val => {
    this.changeSchoolProps('name', val)
  }

  handleDegree = (e, i, val) => {
    this.changeSchoolProps('degree', val)
  }

  handleDateChange = field => (e, uiVal) => {
    let value = moment(new Date(uiVal.replace('/', ', 01, '))).format();
    this.changeSchoolProps(field, value)
  
  }

  handleChange = field => (e, uiVal) => {
    let value;
    if (e.value) {
      value  = e.value[0];
    } else {
      value = e.target.value;
    }

    if (e && e.target && e.target.type === 'checkbox') {
      this.changeSchoolProps('current', !this.props.school.current)
    } else {
      
      if (['major', 'minor'].includes(field)) {
        value = value.split(',');
      }
      
      this.changeSchoolProps(field, value)

    }
  }

  render () {
    const {
            validationErrors
          } = this.state;

    const {
            school,
          } = this.props;
    
    const datePicker = (data, name)  => {
      
      const capitalizeFirstLetter = (string) => {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }

      const inputClass = classNames({
        'rw-date-picker': true,
        'error': validationErrors.startDate && name === 'start',
        'error': validationErrors.endDate && name === 'end',
      });
      
      const err = (
        <div className={cx('err-msg')}>{validationErrors[name + 'Date']}</div>
      )

      if (data && data !== '') {
        return (
          <div className='col-md-6'>
            <DateTimePicker
              defaultValue={new Date(school[name + 'Date'])}
              max={new Date()} 
              className={inputClass}
              onChange={this.handleDateChange(name + 'Date')}
              format={"MM/YYYY"}
              editFormat={'MM/YYYY'}
              time={false}
              initialView={"year"}
              placeholder='mm/yyyy'
            />
            {err}
          </div>
      )} else {
        return (
          <div className='col-md-6'>
            <DateTimePicker
              max={new Date()} 
              className={inputClass}
              onChange={this.handleDateChange(name + 'Date')}
              format={"MM/YYYY"}
              editFormat={'MM/YYYY'}
              time={false}
              initialView={"year"}
              placeholder='mm/yyyy'
            />
            {err}
          </div>
        )
      }
    }

    return (
      <div className={cx('schoolAdd-container')}>

        <form
          onSubmit={this.handleSubmit}
        >
          <div className="col-md-6">
            <SchoolNameTypeahead 
              initial={school.name}
              error={validationErrors.name}
              handleChange={this.handleSchoolName.bind(this)}
            />
          </div>

          <div className="col-md-6">
            <SelectField
              errorText={validationErrors.degree}
              onChange={this.handleDegree}
              value={school.degree}
              floatingLabelText="Degree"
              hintText='Degree'
            >
              <MenuItem value={'Doctorate'} primaryText="Doctorate" />
              <MenuItem value={'Graduate'} primaryText="Graduate" />
              <MenuItem value={'Post Masters Certificate'} primaryText="Post Master's Certificate" />
              <MenuItem value={'Master'} primaryText="Master" />
              <MenuItem value={'Postbaccalaureate Certificate'} primaryText="Postbaccalaureate Certificate" />
              <MenuItem value={'Bachelor'} primaryText="Bachelor" />
              <MenuItem value={'Associate'} primaryText="Associate" />
              <MenuItem value={'First Professional Certificate'} primaryText="First Professional Certificate" />
              <MenuItem value={'High School Diploma'} primaryText="High School Diploma" />
              <MenuItem value={'Certificate'} primaryText="Certificate" />
              <MenuItem value={'Coursework'} primaryText="Coursework" />
              <MenuItem value={'other'} primaryText="Other" />
            </SelectField>
          </div>

          {datePicker(school.startDate, 'start')}

          { !school.current ? (
              datePicker(school.endDate, 'end')
          ) : (null)}
          
          <div className='col-md-6 col-md-offset-6'>
            <Checkbox
              label="Current"
              checked={school.current}
              onCheck={this.handleChange('current')}
            />
          </div>

          <div className="col-md-6">
            <TextField
              value={school.major}
              errorText={validationErrors.major}
              hintText="Seperate multiple by comma"
              floatingLabelText="Major"
              onChange={this.handleChange('major')}
            />
          </div>
          
          <div className="col-md-6">
            <TextField
              value={school.minor}
              errorText={validationErrors.minor}
              hintText="Seperate multiple by comma"
              floatingLabelText="Minor"
              onChange={this.handleChange('minor')}
            />
          </div>
          
          <div className={cx('profile-btn-group')}>
            <RaisedButton className='pull-right' type="submit" label="Save" primary={true} />
            {this.props.handleDelete ? (
              <FlatButton className='pull-left' label="Delete" onClick={this.props.handleDelete} primary={true} />
            ) : (<span />)}
            <FlatButton className='pull-left' label="Close" onClick={this.props.toggleEdit} primary={true} />
          </div>
        </form>
        <Divider />
      </div>
    )
  }
};