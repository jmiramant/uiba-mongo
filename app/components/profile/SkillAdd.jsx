import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import styles from 'css/components/profile/jobItem';
import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);

const intialSkillState = {
  type: '', 
  proficiency: '',
  lengthOfUse: '',
  frequency: '',
}

const proficiency = [
  {label: 'Learning', value: 'learning'},
  {label: 'Intermediate', value: 'intermediate'},
  {label: 'Competent', value: 'competent'},
  {label: 'Expert', value: 'expert'}
];  

const lengthOfUse = [
  {label: 'Less Than 1 Year', value: 0},
  {label: '1-3 Years', value: 1},
  {label: '3-5 Years', value: 3},
  {label: '5-10 Years', value: 5},
  {label: 'More Than 10 Years', value: 10}
];  

const frequency = [
  {label: 'Daily', value: 'daily'},
  {label: 'Weekly', value: 'weekly'},
  {label: 'Monthly', value: 'monthly'},
  {label: 'Yearly', value: 'yearly'}
];  

export default class SchoolAdd extends React.Component {

  static defaultProps = {
    skill: _.clone(intialSkillState)
  }

  constructor(props) {
    super(props)
  }

  state = {
    skill: { ...this.props.skill }, 
    validate: _.clone(intialSkillState),
  }
  
  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {

      this.props.onSkillSave(this.state.skill);

      this.setState({
        skill: _.clone(intialSkillState),
      })
    
    }
  }
  
  validate() {
    // const validationResp = validateJobFormHelper(_.clone(intialSkillState), this.state);
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
  
    this.setState({
        skill: {
          ...this.state.skill,
        [field] : value
        }
    });   
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

            <div>{ validate.type }</div>

            <div className="form-group row">
              <label htmlFor="type" className="col-xs-2 col-form-label">Skill</label>
              <div className="col-xs-5">
                <input onChange={this.handleChange('type')}  className="form-control" type="text" id="type" />
              </div>
            </div>
            
            <div className="form-group row">
              <label htmlFor="proficiency" className="col-xs-2 col-form-label">Proficiency</label>
              <div className="col-xs-10">

                <Select
                    name="proficiency"
                    value="one"
                    options={proficiency}
                    onChange={this.handleChange('proficiency')}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="lengthOfUse" className="col-xs-2 col-form-label">Length Of Use</label>
              <div className="col-xs-10">

                <Select
                    name="lengthOfUse"
                    value="one"
                    options={lengthOfUse}
                    onChange={this.handleChange('lengthOfUse')}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="frequency" className="col-xs-2 col-form-label">Frequency</label>
              <div className="col-xs-10">

                <Select
                    name="frequency"
                    value="one"
                    options={frequency}
                    onChange={this.handleChange('frequency')}
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