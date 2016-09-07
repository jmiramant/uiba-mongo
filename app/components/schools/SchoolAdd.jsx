import React, { PropTypes } from 'react';
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

import moment from 'moment';
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

  handleSchoolName = val => {
    this.props.schoolChange({
      field: 'name',
      value: val,
      id: this.props.school._id
    });   
  }

  handleDegree = (e, i, val) => {
    this.props.schoolChange({
      field: 'degree',
      value: val,
      id: this.props.school._id
    });  
  }

  handleChange = field => (e, uiVal) => {
    let value;
    if (uiVal) {
      if (typeof(Object.getPrototypeOf(uiVal).getTime) === 'function') {
        value = moment(new Date(uiVal)).format();
      } else {
        value = uiVal
      }
    } else if (e.value) {
      value  = e.value[0];
    } else {
      value = e.target.value;
    }

    if (e && e.target && e.target.type === 'checkbox') {
      this.props.schoolChange({
        field: 'current',
        value: !this.props.school.current,
        id: this.props.school._id
      });  
    } else {
      
      if (['major', 'minor'].includes(field)) {
        value = value.split(',');
      }

      this.props.schoolChange({
        field: field,
        value: value,
        id: this.props.school._id
      });  
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
      if (data && data !== '') {
        return (
          <DatePicker
            formatDate={ (obj) => {
              return moment(new Date(obj)).format("MMMM YYYY")
            }}
            value={new Date(school[name + 'Date'])}
            errorText={validationErrors[name + "Date"]}
            className="col-md-6"
            hintText={(name.charAt(0).toUpperCase() + name.slice(1)) + " Date"}
            floatingLabelText={capitalizeFirstLetter(name) + " Date"}
            onChange={this.handleChange(name + 'Date')}
          />
      )} else {
        return (
          <DatePicker
            formatDate={ (obj) => {
              return moment(new Date(obj)).format("MMMM YYYY")
            }}
            errorText={validationErrors[name + "Date"]}
            className="col-md-6"
            hintText={capitalizeFirstLetter(name) + " Date"}
            floatingLabelText={(name.charAt(0).toUpperCase() + name.slice(1)) + " Date"}
            onChange={this.handleChange(name + 'Date')}
          />
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
              <MenuItem value={'Associate'} primaryText="Associate" />
              <MenuItem value={'Bachelor'} primaryText="Bachelor" />
              <MenuItem value={'Graduate'} primaryText="Graduate" />
              <MenuItem value={'Master'} primaryText="Master" />
              <MenuItem value={'Doctorate'} primaryText="Doctorate" />
              <MenuItem value={'Postbaccalaureate Certificate'} primaryText="Postbaccalaureate Certificate" />
              <MenuItem value={'Post Masters Certificate'} primaryText="Post Master's Certificate" />
              <MenuItem value={'Certificate'} primaryText="Certificate" />
              <MenuItem value={'Coursework'} primaryText="Coursework" />
              <MenuItem value={'High School Diploma'} primaryText="High School Diploma" />
              <MenuItem value={'First Professional Certificate'} primaryText="First Professional Certificate" />
              <MenuItem value={'other'} primaryText="Other" />
            </SelectField>
          </div>

          {datePicker(school.startDate, 'start')}

          { !school.current ? (
              datePicker(school.endDate, 'end')
          ) : (<span />)}
          
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