import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import styles from 'css/components/profile/jobItem';
import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);
const intialSchoolState = {
    name: '', 
    startDate: '',
    endDate: '',
    current: false
  }

export default class SchoolAdd extends React.Component {

  static defaultProps = {
    school: _.clone(intialSchoolState)
  }

  constructor(props) {
    super(props)
  }

  state = {
    school: { ...this.props.school }, 
    validate: _.clone(intialSchoolState),
    current: this.props.school.current
  }
  
  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {

      this.props.onSchoolSave(this.state.school);

      this.setState({
        school: _.clone(intialSchoolState),
      })
    
    }
  }
  
  validate() {
    const validationResp = validateSchoolFormHelper(_.clone(intialSchoolState), this.state);
    this.setState({validate: validationResp.error});
    return containsErrors(validationResp.error)
  }

  handleChange = field => e => {
    let value = e.target.value;

    if (e.target.type === 'checkbox') {
      value = this.state.current
      this.setState({
        current: !this.state.current,
        school: {
            ...this.state.school,
          [field] : !this.state.current
        }
      })
    } else {
      this.setState({
          school: {
            ...this.state.school,
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
              <label htmlFor="name" className="col-xs-2 col-form-label">Name</label>
              <div className="col-xs-10">
                <input placeholder={ validate.name } onChange={this.handleChange('name')} className="form-control" type="text" id="name" />
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