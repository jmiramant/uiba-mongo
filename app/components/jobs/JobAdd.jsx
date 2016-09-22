import React, { PropTypes } from 'react';

import UibaDatePicker from '../../components/DatePicker';
import { validateJobHelper } from '../helpers/jobValidations';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import _ from 'lodash';

import styles from 'css/components/profile/jobAdd';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default class JobAdd extends React.Component {
  
  static propTypes = {
    job: PropTypes.object.isRequired,
    jobChange: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    addVisible: PropTypes.bool,
    onJobSave: PropTypes.func.isRequired
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
      this.props.onJobSave(this.props.job);
    }
  }
  
  validate() {
    const validationResp = validateJobHelper(this.props.job, this.state.validationErrors);
    this.setState({validationErrors: validationResp.errors});
    return validationResp.containsErrors;
  }

  changeJobProps(field, value) {
    this.setState({validationErrors: {}})
    this.props.jobChange({
      field: field,
      value: value,
      id: this.props.job._id
    });  
  }

  handleDateChange = (field, value) => {
    this.changeJobProps(field, value);
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

      this.changeJobProps(field, !this.props.job.current)

    } else {

      this.changeJobProps(field, value)

    }
  }

  render () {
    const {
            validationErrors
          } = this.state;

    const {
            job,
          } = this.props;



    return (
      <div className={cx('jobAdd-container')}>
        <form
          onSubmit={this.handleSubmit}
        >

          <div className="col-md-6">
            <TextField
              value={job.companyName}
              errorText={validationErrors.companyName}
              floatingLabelText="Company Name"
              onChange={this.handleChange('companyName')}
            />
          </div>
          
          <div className="col-md-6">
            <TextField
              value={job.title}
              errorText={validationErrors.title}
              floatingLabelText="Title"
              onChange={this.handleChange('title')}
            />
          </div>

          <UibaDatePicker
            data={job.startDate}
            name='start'
            onDateChange={this.handleDateChange}
            validationErrors={validationErrors}
          />

          { !job.current ? (
            <UibaDatePicker
              data={job.endDate}
              name='end'
              onDateChange={this.handleDateChange}
              validationErrors={validationErrors}
            />
          ) : (null)}
          
          <div className='col-md-6 col-md-offset-6'>
            <Checkbox
              label="Current"
              checked={job.current}
              onCheck={this.handleChange('current')}
            />
          </div>

          <div className="col-md-12">
            <TextField
              className={cx('description') + ' col-md-12'}
              value={job.description}
              errorText={validationErrors.description}
              floatingLabelText="Description"
              onChange={this.handleChange('description')}
              multiLine={true}
              rows={1}
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
      </div>
    )
  }
};