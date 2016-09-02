import React, { PropTypes } from 'react';

import { validateJobHelper } from '../helpers/jobValidations';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import moment from 'moment';
import _ from 'lodash';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
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
      this.props.jobChange({
        field: field,
        value: !this.props.job.current,
        id: this.props.job._id
      });  
    } else {
      this.props.jobChange({
        field: field,
        value: value,
        id: this.props.job._id
      });  
    }
  }

  render () {
    const {
            validationErrors
          } = this.state;

    const {
            job,
          } = this.props;

    const datePicker = (data, name)  => {
      if (data && data !== '') {
        return (
          <DatePicker
            autoOk={true}
            formatDate={ (obj) => {
              return moment(new Date(obj)).format("MMMM YYYY")
            }}
            value={new Date(job[name + 'Date'])}
            errorText={validationErrors[name + "Date"]}
            className="col-sm-5"
            hintText={(name.charAt(0).toUpperCase() + name.slice(1)) + " Date"}
            onChange={this.handleChange(name + 'Date')}
          />
      )} else {
        return (
          <DatePicker
            autoOk={true}
            formatDate={ (obj) => {
              return moment(new Date(obj)).format("MMMM YYYY")
            }}
            errorText={validationErrors[name + "Date"]}
            className="col-sm-5"
            hintText={(name.charAt(0).toUpperCase() + name.slice(1)) + " Date"}
            onChange={this.handleChange(name + 'Date')}
          />
        )
      }
    }

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
        >

          <TextField
            value={job.companyName}
            errorText={validationErrors.companyName}
            floatingLabelText="Company Name"
            onChange={this.handleChange('companyName')}
          />
          
          <TextField
            value={job.title}
            errorText={validationErrors.title}
            floatingLabelText="Title"
            onChange={this.handleChange('title')}
          />

          {datePicker(job.startDate, 'start')}

          { !job.current ? (
              datePicker(job.endDate, 'end')
          ) : (<span />)}

          <Checkbox
            label="Current"
            checked={job.current}
            onCheck={this.handleChange('current')}
          />

          <TextField
            value={job.description}
            errorText={validationErrors.description}
            floatingLabelText="Description"
            onChange={this.handleChange('description')}
            multiLine={true}
            rows={2}
          />

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