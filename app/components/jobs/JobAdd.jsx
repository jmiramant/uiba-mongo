import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { containsErrors } from '../helpers/CommonFormValidations';
import { validateJobFormHelper } from '../helpers/jobFormValidation';
import styles from 'css/components/profile/jobItem';
import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);
const intialJobState = {
    companyName: '', 
    title: '', 
    startDate: '',
    endDate: '',
    description: '',
    current: false
  }

export default class JobAdd extends React.Component {

  static defaultProps = {
    job: _.clone(intialJobState)
  }

  constructor(props) {
    super(props)
  }

  state = {
    job: { ...this.props.job }, 
    validate: _.clone(intialJobState),
    current: this.props.job.current
  }
  
  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {

      this.props.onJobSave(this.state.job);

      this.setState({
        job: _.clone(intialJobState),
      })
    
    }
  }
  
  validate() {
    const validationResp = validateJobFormHelper(_.clone(intialJobState), this.state);
    this.setState({validate: validationResp.error});
    return containsErrors(validationResp.error)
  }

  handleChange = field => e => {
    let value = e.target.value;

    if (e.target.type === 'checkbox') {
      value = this.state.current
      this.setState({
        current: !this.state.current,
        job: {
            ...this.state.job,
          [field] : !this.state.current
        }
      })
    } else {
      this.setState({
          job: {
            ...this.state.job,
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

            <div className="form-group row">
              <label htmlFor="companyName" className="col-xs-2 col-form-label">Company Name</label>
              <div className="col-xs-10">
                <input placeholder={ validate.companyName } onChange={this.handleChange('companyName')} className="form-control" type="text" id="companyName" />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="title" className="col-xs-2 col-form-label">Title</label>
              <div className="col-xs-10">
                <input placeholder={ validate.title } onChange={this.handleChange('title')} className="form-control" type="text" id="title" />
              </div>
            </div>

            <div>{ validate.date }</div>

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

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea placeholder={ validate.description } onChange={this.handleChange('description')}  className="form-control" id="description" rows="3"></textarea>
            </div>

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