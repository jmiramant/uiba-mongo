import React, { PropTypes } from 'react';

import SchoolNameTypeahead from '../../containers/Typeahead';
import UibaDatePicker from '../../components/DatePicker';
import { validateSchoolHelper } from '../helpers/schoolValidations';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import _ from 'lodash';

import styles from 'css/components/profile/school';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
let timeout;

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
    this.setState({validationErrors: {}})
    this.props.schoolChange({
      field: field,
      value: value,
      id: this.props.school._id
    }); 
  }

  handleExpand(next) {
    if (this.props.school.name !== next) {
      if(timeout) { clearTimeout(timeout); }
      timeout = setTimeout(() => {
        !this.props.addVisible && this.props.school.name ? this.props.toggleEdit() : null
      }, 500)
    } 
  }
  
  handleSchoolName = val => {
    if (!this.props.addVisible) {
      this.handleExpand(val) 
    }
    this.changeSchoolProps('name', val)
  }

  handleDegree = (e, i, val) => {
    this.changeSchoolProps('degree', val)
  }
  
  handleDateChange = (field, value) => {
    this.changeSchoolProps(field, value);
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
      
      if (['major', 'minor'].indexOf(field) !== -1) {
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
            addVisible
          } = this.props;

    const isVisible = (school.major || addVisible) ? '' : ' ' + cx('closed');

    return (
      <div className={cx('schoolAdd-container') + isVisible}>

        <form
          onSubmit={this.handleSubmit}
        >
          <div className="col-md-6">
            <SchoolNameTypeahead 
              selection={school.name}
              initial={school.name}
              error={validationErrors.name}
              handleChange={this.handleSchoolName.bind(this)}
            />
          </div>

         { addVisible || school.major ? (<span>

          <div className="col-md-6">
            <SelectField
              style={{minWidth: "320px"}}
              errorText={validationErrors.degree}
              onChange={this.handleDegree}
              value={school.degree}
              floatingLabelText="Degree"
              hintText='Degree'
            >
              <MenuItem value={'High School'} primaryText="High School" />
              <MenuItem value={"Associate"} primaryText="Associate's Degree" />
              <MenuItem value={'Bachelor'} primaryText="Bachelor's Degree" />
              <MenuItem value={'Master'} primaryText="Master's Degree" />
              <MenuItem value={'MBA'} primaryText="Master's of Business Administration (MBA)" />
              <MenuItem value={'JD'} primaryText="Juris Doctorate (J.D.)" />
              <MenuItem value={'MD'} primaryText="Doctor of Medicine (M.D.)" />
              <MenuItem value={'PhD'} primaryText="Doctor of Philosophy (Ph.D.)" />
              <MenuItem value={'Engineer Degree'} primaryText="Engineer's Degree" />
              <MenuItem value={'Certificate'} primaryText="Certificate" />
              <MenuItem value={'Coursework'} primaryText="Coursework" />
              <MenuItem value={'other'} primaryText="Other" />
            </SelectField>
          </div>

          <UibaDatePicker
            data={school.startDate}
            name='start'
            onDateChange={this.handleDateChange}
            validationErrors={validationErrors}
          />

          { !school.current ? (
            <UibaDatePicker
              data={school.endDate}
              name='end'
              onDateChange={this.handleDateChange}
              validationErrors={validationErrors}
            />
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
              hintText="Separate multiple by comma"
              floatingLabelText="Major"
              onChange={this.handleChange('major')}
            />
          </div>
          
          <div className="col-md-6">
            <TextField
              value={school.minor}
              errorText={validationErrors.minor}
              hintText="Separate multiple by comma"
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
          </span>) : (null)}

        </form>
      </div>
    )
  }
};