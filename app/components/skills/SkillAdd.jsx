import React, { PropTypes } from 'react';

import { validateSkillHelper } from '../helpers/skillValidations';
import skillData from './SkillData';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/skill';

import SkillSlider from './SkillSlider';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);

const SkillData = skillData();

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
    const errorStore = validateSkillHelper(this.props.skill, this.state.validationErrors);
    this.setState({validationErrors: errorStore.errors});
    return errorStore.containsErrors;
  }

  changeSkillProps(field, value) {
      this.props.skillChange({
      field: field,
      value: value,
      id: this.props.skill._id
    });  
  }

  handleSkillChange (value) {
    this.changeSkillProps('type', value)
  }

  sliderChange(field, value) {
    this.changeSkillProps(field, value)
  }

  handleChange = field => (e, i, val) => {
    const value = (val ? val : i)
    this.changeSkillProps(field, value)
  }

  render () {
    
    const {
            validationErrors
          } = this.state;

    const {
            skill,
          } = this.props;

    return (
      <div>
        <form
          className={cx('skillAdd--form')}
          onSubmit={this.handleSubmit}
        >
          <AutoComplete
            hintText='Add one skill at a time.'
            searchText={skill.type}
            floatingLabelText="Skill"
            errorText={validationErrors.type}
            filter={AutoComplete.fuzzyFilter}
            dataSource={SkillData}
            onNewRequest={this.handleSkillChange.bind(this)}
            onUpdateInput={this.handleSkillChange.bind(this)}
            maxSearchResults={5}
          />

          <SkillSlider
            skill={skill}
            errorText={validationErrors.proficiency}
            title="Proficiency"
            field={'proficiency'}
            handleChange={this.sliderChange.bind(this)}
            stages={['learning', 'intermediate', 'competent', 'expert']}
          />

          <SkillSlider
            skill={skill}
            errorText={validationErrors.lengthOfUse}
            title="Length of Use"
            field={'lengthOfUse'}
            handleChange={this.sliderChange.bind(this)}
            storeValue={[0, 1, 3, 5, 10]}
            stages={['>1', '1-3', '3-5', '5-10', '<10']}
          />

          <div className={cx('profile-btn-group')}>
            <RaisedButton className='pull-right' type="submit" label="Save + Add" primary={true} />
            <FlatButton className='pull-right' type="submit" label="Save" primary={true} />
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