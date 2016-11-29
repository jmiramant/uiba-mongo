import React, { PropTypes } from 'react';

import Popover from 'material-ui/Popover';
import DuelSlider from 'components/DuelSlider';
import FlatButton from 'material-ui/FlatButton';
import RoleSkills from 'components/roles/RoleSkillList';
import LocationFilterController from 'containers/LocationFilterController'
import RaisedButton from 'material-ui/RaisedButton';
import MulitselectPopover from 'components/MulitselectPopover';

import classNames from 'classnames/bind';
import styles from 'css/components/role';
const cx = classNames.bind(styles);

export default class RequirementSelectors extends React.Component {
  
  static PropTypes =  {
    role: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    onEditSave: PropTypes.func.isRequired,
    onSkillSave: PropTypes.func.isRequired,
    filterChange: PropTypes.func.isRequired,
    onSkillDelete: PropTypes.func.isRequired,
    toggleSkillAdd: PropTypes.func.isRequired,
    eduRequirements: PropTypes.func.isRequired,
    onToggleEduReqSelect: PropTypes.func.isRequired,
  }

  state = {
    validationErrors: {},
    skill: { open: false, anchorEl: null },
    location: { open: false, anchorEl: null },
  }

  constructor(props) {
    super(props);
  }

  closePopover = (popover) => {
    this.setState({
      [popover]: {
        open: false, 
        anchorEl: null 
      }
    })
  }
  
  skillSet() {
    this.setState({skill: { open: false, anchorEl: null }})
    this.changeFilter();
  }

  changeFilter() {
    this.props.filterChange({
      school: this.props.eduRequirements,
      skill: this.props.skills,
    });
  }

  openMultiSelect = (popover, e) => {
    this.setState({ [popover]: {
        open: true,
        anchorEl: e.currentTarget,
      }
    });
  };

  render () {

    const {
      role,
      skills,
      messages,
      onEditSave,
      onSkillSave,
      showSkillAdd,
      onSkillDelete,
      toggleSkillAdd,
      eduRequirements,
      onToggleEduReqSelect,
    } = this.props;

    return (
      <div className={cx('req-container')}>
        
        <p className={cx('req-title')}>Filters:</p>

        <div className={cx('req-btns') +" col-md-3"}>
          <MulitselectPopover
            data={['High School','Associate','Bachelor','Master','MBA','JD','MD','PhD','Engineer Degree','Certificate','Coursework','Other']}
            selected={eduRequirements}
            buttonText='Edu Requirements'
            onToggleSelect={onToggleEduReqSelect}
            handleSet={this.changeFilter.bind(this)}
          />
        </div>

        <div className={cx('req-btns') +' col-md-3'}>
          <RaisedButton
            labelStyle={{fontSize: '10px', paddingLeft: '9px', paddingRight: '9px'}}
            onClick={(e) => {this.openMultiSelect('skill', e)}}
            label='Skill Requirements'
          />
          <Popover
            open={this.state.skill.open}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            anchorEl={this.state.skill.anchorEl}
            style={{width: '600px', minHeight: '210px'}}
          >
            <RoleSkills 
              skills={skills}
              addVisible={ showSkillAdd}
              errorMessage={messages.errorMessage}
              toggleSkillAdd={toggleSkillAdd}
              onEditSave={onEditSave} 
              onSkillSave={onSkillSave} 
              onSkillDelete={onSkillDelete} 
            />
            <FlatButton className='pull-right' label="set" onClick={this.skillSet.bind(this)} primary={true} />
            <FlatButton className='pull-right' label="close" onClick={() => {this.closePopover('skill')}} primary={true} />
          </Popover>
        </div>


        <div className={cx('req-btns') +" col-md-3"}>
          <RaisedButton
            labelStyle={{fontSize: '10px', paddingLeft: '9px', paddingRight: '9px'}}
            onClick={(e) => {this.openMultiSelect('location', e)}}
            label='Location Range'
          />
          <Popover
            open={this.state.location.open}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            anchorEl={this.state.location.anchorEl}
            style={{height: '200px', width: '375px'}}
          >
            <LocationFilterController/>
            <FlatButton className='pull-right' label="set" onClick={() => {this.closePopover('location')}} primary={true} />
            <FlatButton className='pull-right' label="close" onClick={() => {this.closePopover('location')}} primary={true} />
          </Popover>
        </div>
      </div>
    )
  }
};