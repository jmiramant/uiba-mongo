import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import styles from 'css/components/profile/jobItem';
import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);
const intialSchoolState = {
    name: '', 
    major: [],
    minor: [],
    degree: [],
    startDate: '',
    endDate: '',
    current: false
  }
const degrees = [
  {label: 'Associate',value: 'Associate'},
  {label: 'Bachelor',value: 'Bachelor'},
  {label: 'Graduate',value: 'Graduate'},
  {label: 'Master',value: 'Master'},
  {label: 'Doctorate',value: 'Doctorate'},
  {label: 'First Professional Certificate',value: 'First Professional Certificate'},
  {label: 'Postbaccalaureate Certificate',value: 'Postbaccalaureate Certificate'},
  {label: "Post Master's Certificate", value: "Post Master's Certificate"},
  {label: 'Certificate',value: 'Certificate'},
  {label: 'Coursework',value: 'Coursework'},
  {label: 'High School Diploma',value: 'High School Diploma'},
  {label: 'Other',value: 'other'}
];  

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
    // const validationResp = validateJobFormHelper(_.clone(intialSchoolState), this.state);
    // this.setState({validate: validationResp.error});
    //return containsErrors(validationResp.error);
    return false;
  }

  handleChange = field => e => {
    let value;

    if (e.value) {
      value  = e.value[0];
    } else {
      value = e.target.value;
    }
   
    if (e.target && e.target.type === 'checkbox') {
      value = this.state.current
      this.setState({
        current: !this.state.current,
        school: {
            ...this.state.school,
          [field] : !this.state.current
        }
      })
    } else {
      
      if (['major', 'minor', 'degree'].includes(field)) {
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
            
            <div className="form-group row">
              <label htmlFor="major" className="col-xs-2 col-form-label">Major</label>
              <div className="col-xs-10">
                <input placeholder={ validate.major } onChange={this.handleChange('major')} className="form-control" type="text" id="major" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="minor" className="col-xs-2 col-form-label">Minor</label>
              <div className="col-xs-10">
                <input placeholder={ validate.minor } onChange={this.handleChange('minor')} className="form-control" type="text" id="minor" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="degree" className="col-xs-2 col-form-label">Degree</label>
              <div className="col-xs-10">

                <Select
                    name="degree"
                    value="one"
                    options={degrees}
                    onChange={this.handleChange('degree')}
                />
              </div>
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