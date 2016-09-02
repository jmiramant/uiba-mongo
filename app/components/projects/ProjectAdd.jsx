import React, { PropTypes } from 'react';

import { validateProjectHelper } from '../helpers/projectValidations';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';
import _ from 'lodash';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
const cx = classNames.bind(styles);

export default class ProjectAdd extends React.Component {

  static propTypes = {
    project: PropTypes.object.isRequired,
    projectChange: PropTypes.func.isRequired,
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
      this.props.onProjectSave(this.props.project);
    }
  }
  
  validate() {
    // const validationResp = validateProjectHelper(this.props.project, this.state.validationErrors);
    // this.setState({validationErrors: validationResp.errors});
    // return validationResp.containsErrors;
    return false;
  }

  handleChange = field => e => {
    let value;
    if (e.target) {
      value = e.target.value      
    } else {
      value = e.value
    }

    if (e.target.type === 'checkbox') {
      value = this.state.current
      this.props.projectChange({
        field: 'current',
        value: !this.props.project.current,
        id: this.props.project._id
      });  
    } else {
  
      this.props.projectChange({
        field: field,
        value: value,
        id: this.props.project._id
      });  
    } 
  }

  render () {
    const {
            validationErrors
          } = this.state;

    const {
            project,
          } = this.props;
    
    const datePicker = (data, name)  => {
      if (data && data !== '') {
        return (
          <DatePicker
            autoOk={true}
            formatDate={ (obj) => {
              return moment(new Date(obj)).format("MMMM YYYY")
            }}
            value={new Date(project[name + 'Date'])}
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
            value={project.name}
            errorText={validationErrors.name}
            floatingLabelText="Project"
            onChange={this.handleChange('name')}
          />
          
          <TextField
            value={project.projectUrl}
            errorText={validationErrors.projectUrl}
            floatingLabelText="URL"
            onChange={this.handleChange('projectUrl')}
          />
          
            {datePicker(project.startDate, 'start')}

            { !project.current ? (
                datePicker(project.endDate, 'end')
            ) : (<span />)}
  
            <Checkbox
              label="Current"
              checked={project.current}
              onCheck={this.handleChange('current')}
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