import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import SchoolNameTypeahead from '../../containers/Typeahead';

import { containsErrors, setValidationErrorObject } from '../helpers/CommonFormValidations';
import { validateSchoolFormHelper } from '../helpers/schoolFormValidations';

import styles from 'css/components/profile/jobItem';
import areIntlLocalesSupported from 'intl-locales-supported';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import moment from 'moment';
import _ from 'lodash';

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

export default class SchoolAdd extends React.Component {

  static defaultProps = {
    school: _.cloneDeep(intialSchoolState)
  }

  constructor(props) {
    super(props)
  }

  state = {
    school: { ...this.props.school }, 
    validationErrors: setValidationErrorObject(intialSchoolState),
    current: this.props.school.current
  }
  
  handleSubmit = e => {
    e.preventDefault();

    if (!this.validate()) {

      this.props.onSchoolSave(this.state.school);

      this.setState({
        school: _.cloneDeep(intialSchoolState),
      })
    
    }
  }
  
  validate() {
    const validationResp = validateSchoolFormHelper(_.cloneDeep(intialSchoolState), this.state);
    this.setState({validationErrors: validationResp.error});
    console.log(validationResp.error)
    return containsErrors(validationResp.error);
  }

  handleSchoolName = e => {
    this.setState({
        school: {
          ...this.state.school,
          name : e
        }
    });
  }

  handleDegree = (e, i, val) => {
    this.setState({
        school: {
          ...this.state.school,
          degree : val
        }
    });
  }

  handleChange = field => (e, uiVal) => {
    let value;

    if (uiVal) {
      value = uiVal
    } else if (e.value) {
      value  = e.value[0];
    } else {
      value = e.target.value;
    }

    if (e && e.target && e.target.type === 'checkbox') {
      value = this.state.current
      this.setState({
        current: !this.state.current,
        school: {
            ...this.state.school,
          [field] : !this.state.current
        }
      })
    } else {
      
      if (['major', 'minor'].includes(field)) {
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

  render () {
    const { validationErrors, current } = this.state;

    return (
      <div>
        <form
          className="wrapper"
          onSubmit={this.handleSubmit}
        >
          <div className="panel">

            <div className="form-group row">
              <div className="col-xs-10">
                <SchoolNameTypeahead error={validationErrors.name} handleChange={this.handleSchoolName}/>
              </div>
            </div>
            <div className='error'>{validationErrors.date}</div>
            <div className="form-group row">
              <DatePicker
                errorText={validationErrors.startDate}
                className="col-sm-5"
                hintText="Start Date"
                onChange={this.handleChange('startDate')}
              />
            </div>
            <div className="form-group row">

              { !current ? (
                <DatePicker
                  errorText={validationErrors.endDate}
                  className="col-sm-5"
                  hintText="End Date"
                  onChange={this.handleChange('endDate')}
                />
              ) : (<span />)}
            </div>
  
            <Checkbox
              label="Current"
              onCheck={this.handleChange('current')}
            />

            <div className="form-group row">
              <div className="col-xs-10">
                <TextField
                  errorText={validationErrors.major}
                  hintText="Seperate multiple by comma"
                  floatingLabelText="Major"
                  onChange={this.handleChange('major')}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-xs-10">
                <TextField
                  errorText={validationErrors.minor}
                  hintText="Seperate multiple by comma"
                  floatingLabelText="Minor"
                  onChange={this.handleChange('minor')}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-xs-10">
                <SelectField
                  errorText={validationErrors.degree}
                  value={this.state.school.degree}
                  onChange={this.handleDegree}
                  hintText='Degree'
                >
                  <MenuItem value={1} primaryText="Associate" />
                  <MenuItem value={2} primaryText="Bachelor" />
                  <MenuItem value={3} primaryText="Graduate" />
                  <MenuItem value={4} primaryText="Master" />
                  <MenuItem value={5} primaryText="Doctorate" />
                  <MenuItem value={6} primaryText="Postbaccalaureate Certificate" />
                  <MenuItem value={7} primaryText="Post Master's Certificate" />
                  <MenuItem value={8} primaryText="Certificate" />
                  <MenuItem value={9} primaryText="Coursework" />
                  <MenuItem value={10} primaryText="High School Diploma" />
                  <MenuItem value={11} primaryText="First Professional Certificate" />
                  <MenuItem value={12} primaryText="other" />
                </SelectField>
              </div>
            </div>

            <RaisedButton type="submit" label="Save" primary={true} />

          </div>
        </form>
      </div>
    )
  }
};