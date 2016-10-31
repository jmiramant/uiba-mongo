import React, { PropTypes } from 'react';

import UibaDatePicker from '../../components/DatePicker';
import { validateProjectHelper } from '../helpers/roleValidations';

import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';
import _ from 'lodash';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/role';
const cx = classNames.bind(styles);
let timeout;

export default class RoleAdd extends React.Component {

  static propTypes = {
    role: PropTypes.object.isRequired,
    roleChange: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    addVisible: PropTypes.bool,
    onProjectSave: PropTypes.func.isRequired
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
      this.props.onProjectSave(this.props.role);
    }
  }
  
  validate() {
    const validationResp = validateProjectHelper(this.props.role, this.state.validationErrors);
    this.setState({validationErrors: validationResp.errors});
    return validationResp.containsErrors;
  }

  changeProjectProps(field, value) {
    if (!this.props.addVisible) {
      this.handleExpand(value) 
    }
    this.setState({validationErrors: {}})
    this.props.roleChange({
      field: field,
      value: value,
      id: this.props.role._id
    });  
  }

  handleExpand(next) {
    if (this.props.role.name !== next) {
      if(timeout) { clearTimeout(timeout); }
      timeout = setTimeout(() => {
        !this.props.addVisible && this.props.role.name ? this.props.toggleEdit() : null
      }, 500)
    } 
  }

  formatURL(url) {
    const inHttps = url.includes('https')
    const inHttp = url.includes('http')
    if (!inHttp && !inHttps) {
      return "http://" + url
    } else {
      return url
    }
  }

  handleDateChange = (field, value) => {
    this.changeProjectProps(field, value);
  }

  handleChange = field => (e, uiVal) => {
    let value;
    if (uiVal) {
      value = uiVal
    } else if (e.target) {
      value = e.target.value      
    } else {
      value = e.value
    }

    if (field === 'roleUrl') {
      value = this.formatURL(value)
    }

    if (e && e.target && e.target.type === 'checkbox') {

      this.changeProjectProps('current', !this.props.role.current)
    
    } else {
  
      this.changeProjectProps(field, value)

    } 
  }

  render () {
    const {
            validationErrors
          } = this.state;

    const {
            role,
            addVisible
          } = this.props;

    const isVisible = (role.description || addVisible) ? '' : ' ' + cx('closed');

    return (

      <div className={cx('roleAdd-container') + isVisible}>
        <form
          onSubmit={this.handleSubmit}
        >

          <div className="col-md-6">
            <TextField
              value={role.name}
              errorText={validationErrors.name}
              floatingLabelText="Add a Project"
              onChange={this.handleChange('name')}
            />
          </div>

          { addVisible || role.description ? (<span>

          <div className="col-md-6">
            <TextField
              value={role.roleUrl}
              errorText={validationErrors.roleUrl}
              floatingLabelText="URL"
              onChange={this.handleChange('roleUrl')}
            />
          </div>
          
          <UibaDatePicker
            data={role.startDate}
            name='start'
            onDateChange={this.handleDateChange}
            validationErrors={validationErrors}
          />

          { !role.current ? (
            <UibaDatePicker
              data={role.endDate}
              name='end'
              onDateChange={this.handleDateChange}
              validationErrors={validationErrors}
            />
          ) : (null)}

          <div className='col-md-6 col-md-offset-6'>
            <Checkbox
              label="Current"
              checked={role.current}
              onCheck={this.handleChange('current')}
            />
          </div>
          
          <div className="col-md-12">
            <TextField
              value={role.description}
              className={cx('description') + ' col-md-12'}
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
          </span>) : (<span/>)}
        </form>
      </div>
    )
  }
};