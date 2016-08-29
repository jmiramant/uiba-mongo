import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import styles from 'css/components/profile/jobItem';
import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);

const intialProjectState = {
  name: '', 
  projectUrl: '',
  startDate: '',
  endDate: '',
  current: false
}

export default class SchoolAdd extends React.Component {

  static defaultProps = {
    project: _.clone(intialProjectState)
  }

  static propTypes = {
    onSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  state = {
    project: { ...this.props.project }, 
    validate: _.clone(intialProjectState),
  }
  
  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {

      this.props.onSave(this.state.project);

      this.setState({
        project: _.clone(intialProjectState),
      })
    
    }
  }
  
  validate() {
    // const validationResp = validateJobFormHelper(_.clone(intialProjectState), this.state);
    // this.setState({validate: validationResp.error});
    //return containsErrors(validationResp.error);
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
      this.setState({
        current: !this.state.current,
        project: {
            ...this.state.project,
          [field] : !this.state.current
        }
      })
    } else {
  
      this.setState({
          project: {
            ...this.state.project,
          [field] : value
          }
      });  
    } 
  }

  render () {
    const { validate, current } = this.state;
    return (
      <div>
        <form
          className="wrapper"
          onSubmit={this.handleSubmit}
        >
          <div className="panel">

            <div>{ validate.name }</div>

            <div className="form-group row">
              <label htmlFor="name" className="col-xs-2 col-form-label">Project Name</label>
              <div className="col-xs-5">
                <input onChange={this.handleChange('name')}  className="form-control" type="text" id="name" />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="projectUrl" className="col-xs-2 col-form-label">URL</label>
              <div className="col-xs-5">
                <input onChange={this.handleChange('projectUrl')}  className="form-control" type="text" id="projectUrl" />
              </div>
            </div>
            
            <div className="form-group row">
              <label htmlFor="startDate" className="col-xs-2 col-form-label">Start Date</label>
              <div className="col-xs-5">
                <input onChange={this.handleChange('startDate')}  className="form-control" type="date" id="startDate" />
              </div>
            </div>
            
            { !current ? (
              <div className="form-group row">
                <label htmlFor="endDate" className="col-xs-2 col-form-label">End Date</label>
                <div className="col-xs-5">
                  <input onChange={this.handleChange('endDate')} className="form-control" type="date" id="endDate" />
                </div>
              </div>
              ) : (<span />)
            }
  
            <input 
              type="checkbox"
              checked={current}
              onChange={this.handleChange('current')} />

            <button
              className="btn"
              type="submit"
            >
             Save
            </button>

          </div>
        </form>
      </div>
    )
  }
};