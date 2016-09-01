import React, { PropTypes } from 'react';

import { containsErrors } from '../helpers/CommonFormValidations';
import { validateSkillHelper } from '../helpers/skillValidations';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);

export default class SkillAdd extends React.Component {
  
  static propTypes = {
    skill: PropTypes.object.isRequired,
    skillChange: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    addVisible: PropTypes.bool,
    onSkillSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  state = {
    validationErrors: {}
  }
  
  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {
      this.props.onSkillSave(this.props.skill);
    }
  }
  
  validate() {
    const validationResp = validateSkillHelper(this.props.skill, this.state);
    this.setState({validationErrors: validationResp.error});
    return containsErrors(validationResp.error);
  }

  handleChange = field => (e, i, val) => {
    const value = (val ? val : i)

    this.props.skillChange({
      field: field,
      value: value,
      id: this.props.skill._id
    });   

  }

  render () {
    
    const { current, 
            validationErrors
          } = this.state;

    const {
            skill,
          } = this.props;

    return (
      <div>
        <form
          className="wrapper"
          onSubmit={this.handleSubmit}
        >
          <TextField
            value={skill.type}
            errorText={validationErrors.type}
            floatingLabelText="Skill"
            onChange={this.handleChange('type')}
          />
          
          <SelectField
            errorText={validationErrors.proficiency}
            onChange={this.handleChange('proficiency')}
            value={skill.proficiency}
            hintText='Proficiency'
          >
            <MenuItem value={'learning'} primaryText="Learning" />
            <MenuItem value={'intermediate'} primaryText="Intermediate" />
            <MenuItem value={'competent'} primaryText="Competent" />
            <MenuItem value={'expert'} primaryText="Expert" />
          </SelectField>

          <SelectField
            errorText={validationErrors.lengthOfUse}
            onChange={this.handleChange('lengthOfUse')}
            value={skill.lengthOfUse}
            hintText='Length of Use'
          >
            <MenuItem value={0} primaryText="Less Than 1 Year" />
            <MenuItem value={1} primaryText="1-3 Years" />
            <MenuItem value={3} primaryText="3-5 Years" />
            <MenuItem value={5} primaryText="5-10 Years" />
            <MenuItem value={10} primaryText="More Than 10 Years" />
          </SelectField>

          <SelectField
            errorText={validationErrors.frequency}
            onChange={this.handleChange('frequency')}
            value={skill.frequency}
            hintText='Frequency of Use'
          >
            <MenuItem value={'daily'} primaryText="Daily" />
            <MenuItem value={'weekly'} primaryText="Weekly" />
            <MenuItem value={'monthly'} primaryText="Monthly" />
            <MenuItem value={'yearly'} primaryText="Yearly" />
          </SelectField>
          
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