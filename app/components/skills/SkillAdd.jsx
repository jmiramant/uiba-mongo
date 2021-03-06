import React, { PropTypes } from 'react';

import { validateSkillHelper } from '../helpers/skillValidations';
import skillData from './SkillData';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/skill';

import UibaSlider from '../UibaSlider';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);

const SkillData = skillData();
let timeout;

export default class SkillAdd extends React.Component {
  
  static propTypes = {
    skill: PropTypes.object.isRequired,
    skillChange: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    addVisible: PropTypes.bool,
    onSkillSave: PropTypes.func.isRequired,
    onInputFocus: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.skillEl = undefined;
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
    this.setState({validationErrors: {}})
    const skillData = {
      field: field,
      value: value,
      id: this.props.skill._id,
    }
    if (this.props.skill.type) skillData.type = this.props.skill.type
    this.props.skillChange(skillData);
  }

  handleExpand(next) {
    
    if (this.props.skill.type !== next) {
      if(timeout) { clearTimeout(timeout); }
      timeout = setTimeout(() => {
        !this.props.addVisible && this.props.skill.type && !this.props.skill.edit ? this.props.toggleEdit() : null
      }, 500)
    } 
  }

  handleSkillChange (value) {
    if (!this.props.addVisible) {
      this.handleExpand(value) 
    }
    this.changeSkillProps('type', value)
  }

  sliderChange(field, value) {
    this.changeSkillProps(field, value)
  }

  handleChange = field => (e, i, val) => {
    const value = (val ? val : i)
    this.changeSkillProps(field, value)
  }

  disableEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  onInputFocus() {
    if (this.props.onInputFocus) this.props.onInputFocus(true);

  }

  onInputBlur() {
    if (this.props.onInputFocus) this.props.onInputFocus(false);
  }

  render () {

    const {
            validationErrors
          } = this.state;

    const {
            skill,
            addVisible,
            isEdit
          } = this.props;

    let skillText = 'Add a Skill';
    if (skill.edit) skillText = 'Skill';

    return (
      <div>
        <form
          className={cx('skillAdd--form')}
        >
          <AutoComplete
            onFocus={this.onInputFocus.bind(this)}
            onBlur={this.onInputBlur.bind(this)}
            onKeyDown={this.disableEnter}
            hintText='Add one skill at a time.'
            searchText={skill.type}
            floatingLabelText={skillText}
            errorText={validationErrors.type}
            filter={AutoComplete.fuzzyFilter}
            dataSource={SkillData}
            onNewRequest={this.handleSkillChange.bind(this)}
            onUpdateInput={this.handleSkillChange.bind(this)}
            maxSearchResults={5}
          />
          
          { addVisible || skill.edit ? (
            <span>
              <UibaSlider
                dataSource={skill}
                errorText={validationErrors.proficiency}
                title="Proficiency"
                field={'proficiency'}
                handleChange={this.sliderChange.bind(this)}
                storeValue={[1, 2, 3, 4]}
                stages={['learning', 'intermediate', 'competent', 'expert']}
              />

              <UibaSlider
                dataSource={skill}
                errorText={validationErrors.lengthOfUse}
                title="Length of Use (Yrs)"
                field={'lengthOfUse'}
                style={{width: '90%'}}
                handleChange={this.sliderChange.bind(this)}
                storeValue={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                stages={['>1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']}
              />

              <div className={cx('profile-btn-group')}>
                <RaisedButton className='pull-right' onClick={this.handleSubmit} label="Save" primary={true} />
                {this.props.handleDelete ? (
                  <FlatButton className='pull-left' label="Delete" onClick={this.props.handleDelete} primary={true} />
                ) : (<span />)}
                <FlatButton className='pull-left' label="Close" onClick={this.props.toggleEdit} primary={true} />
              </div>
            </span>
          ) : (null)}

        </form>
      </div>
    )
  }
};