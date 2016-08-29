import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import styles from 'css/components/profile/jobItem';
import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);

const intialLanguageState = {
  type: '', 
  proficiency: '',
  experience: '',
}
const proficiency = [
  {label: 'Elementary Proficiency', value: 'elementary proficiency'},
  {label: 'Limited Working Proficiency', value: 'limited working proficiency'},
  {label: 'Minimum Professional Proficiency', value: 'minimum professional proficiency'},
  {label: 'Full Professional Proficiency', value: 'full professional proficiency'},
  {label: 'Native Or Bilingual Proficiency', value: 'native or bilingual proficiency'}
]; 

export default class LanguageAdd extends React.Component {

  static defaultProps = {
    language: _.clone(intialLanguageState)
  }

  static propTypes = {
    addVisibile: PropTypes.bool,
    onSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  state = {
    language: { ...this.props.language }, 
    validate: _.clone(intialLanguageState),
  }
  
  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {

      lhis.props.onSave(this.state.language);

      this.setState({
        language: _.clone(intialLanguageState),
      })
    
    }
  }
  
  validate() {
    // const validationResp = validateJobFormHelper(_.clone(intialLanguageState), this.state);
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
        language: {
          ...this.state.language,
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

            <div>{ validate.language }</div>

            <div className="form-group row">
              <label htmlFor="language" className="col-xs-2 col-form-label">Language</label>
              <div className="col-xs-5">
                <input onChange={this.handleChange('language')}  className="form-control" type="text" id="language" />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="proficiency" className="col-xs-2 col-form-label">Proficiency</label>
              <div className="col-xs-5">
                <Select
                  name="proficiency"
                  value="one"
                  options={proficiency}
                  onChange={this.handleChange('proficiency')}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="experience" className="col-xs-2 col-form-label">Experience</label>
              <div className="col-xs-5">
                <input onChange={this.handleChange('experience')}  className="form-control" type="text" id="experience" />
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