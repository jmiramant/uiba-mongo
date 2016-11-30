import React, { PropTypes } from 'react';

import Popover from 'material-ui/Popover';
import DuelSlider from 'components/DuelSlider';
import FlatButton from 'material-ui/FlatButton';
import RoleSkills from 'components/roles/RoleSkillList';
import LocationFilterController from 'containers/LocationFilterController'
import RaisedButton from 'material-ui/RaisedButton';
import MulitselectPopover from 'components/MulitselectPopover';
import Divider from 'material-ui/Divider';
import classNames from 'classnames/bind';
import roleStyles from 'css/components/role';
import styles from 'css/components/applicantFilter';
const cx = classNames.bind(roleStyles);
const cy = classNames.bind(styles);

export default class ApplicantFiler extends React.Component {
  
  static PropTypes =  {
    role: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
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
    score: { open: false, anchorEl: null },
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
    this.props.filterChange({skill: this.props.skills});
  }

  addressSet() {
    const { address } = this.props;
    this.setState({location: { open: false, anchorEl: null }});
    this.props.filterChange({address: {
      rangeZips: address.rangeZips,
      zip: address.zip,
      range: address.range
    }});
  }

  changeEduFilter() {
    this.props.filterChange({school: this.props.eduRequirements});
  }

  openMultiSelect = (popover, e) => {
    this.setState({ [popover]: {
        open: true,
        anchorEl: e.currentTarget,
      }
    });
  };

  isFilters(f) {
    if ( (Object.keys(f).length >= 1) && ( (f.school && f.school.length > 0) || (f.skill && f.skill.length > 0) || ( f.address && (Object.keys(f.address).length > 0 || f.address.length > 0)))) {
      return true;
    } else {
      return false;
    };
  }

  render () {

    const {
      role,
      skill,
      skills,
      address,
      filters,
      messages,
      onEditSave,
      skillChange,
      onSkillSave,
      skillsChange,
      clearFilters,
      showSkillAdd,
      onSkillDelete,
      toggleSkillAdd,
      eduRequirements,
      onToggleEduReqSelect,
    } = this.props;

    return (
      <div className={cx('req-container') + " " + cy('filter-container')}>

        <div className={cy('header-container')}>
          <p className={cx('req-title') + " " + cy('filter-title')}>Filter Candidates</p>
          <div className={cy('filter-state') + ' pull-right'}>
            <RaisedButton labelStyle={{fontSize: '11px'}} className={cy('filter-btn')} label="Save as Role Requirements" onClick={clearFilters} primary={true} />
            { this.isFilters(filters) ? (<RaisedButton style={{margin: '0 10px'}} labelStyle={{fontSize: '11px'}} className={cy('filter-btn')} label="clear filters" onClick={clearFilters} primary={true} />) : (null)}
          </div>
        </div>

        <div className={cx('req-btns') +" col-md-3"}>
          <MulitselectPopover
            style={{width: '100%'}}
            data={['High School','Associate','Bachelor','Master','MBA','JD','MD','PhD','Engineer Degree','Certificate','Coursework','Other']}
            selected={eduRequirements}
            buttonText='Edu Requirements'
            onToggleSelect={onToggleEduReqSelect}
            handleSet={this.changeEduFilter.bind(this)}
          />
          {filters.school && filters.school.length ? (
            <ul className={cy('enabled-filters', 'list')}>
              {filters.school.map((f,i) => (
                <span className={cy('degree-item')} key={f+i}>
                  <li className={cy('enabled-filter-item')}>{f}</li>
                  <Divider/>
                </span>
              ))}
            </ul>
          ) : (null)}
        </div>

        <div className={cx('req-btns') +' col-md-3'}>
          <RaisedButton
            style={{width: '100%'}}
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
              skill={skill}
              skills={skills}
              addVisible={showSkillAdd}
              onEditSave={onEditSave} 
              onSkillSave={onSkillSave} 
              skillChange={skillChange}
              skillsChange={skillsChange}
              errorMessage={messages.errorMessage}
              onSkillDelete={onSkillDelete} 
              toggleSkillAdd={toggleSkillAdd}
            />
            <FlatButton className='pull-right' label="set" onClick={this.skillSet.bind(this)} primary={true} />
            <FlatButton className='pull-right' label="close" onClick={() => {this.closePopover('skill')}} primary={true} />
          </Popover>
          {filters.skill && filters.skill.length > 0 ? (
            <ul className={cy('enabled-filters', 'list')}>
              {filters.skill.map((f,i) => (
                <span key={f.type + i}>
                  <li className={cy('enabled-filter-item')} >Min. {f.lengthOfUse} yrs in {f.type} with at least '{['Learning', 'Intermediate', 'Competent', 'Expert'][f.proficiency - 1]}' proficiency</li>
                  <Divider/>
                </span>
              ))}
            </ul>
          ) : (null)}
        </div>


        <div className={cx('req-btns') +" col-md-3"}>
          <RaisedButton
            style={{width: '100%'}}
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
            <FlatButton className='pull-right' label="set" onClick={this.addressSet.bind(this)} primary={true} />
            <FlatButton className='pull-right' label="close" onClick={() => {this.closePopover('location')}} primary={true} />
          </Popover>
          {filters.address && filters.address.zip ? (
            <div className={cy('enabled-filters', 'enabled-filter-item')}>Applicants {address.range} mile radius of {address.zip} </div>
          ) : (null)}
        </div>

        <div className={cx('req-btns') +" col-md-3"}>
          <RaisedButton
            style={{width: '100%'}}
            labelStyle={{fontSize: '10px', paddingLeft: '9px', paddingRight: '9px'}}
            onClick={(e) => {this.openMultiSelect('score', e)}}
            label='Role Score'
          />
          <Popover
            open={this.state.score.open}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            anchorEl={this.state.score.anchorEl}
            style={{height: '200px', width: '375px'}}
          >
            <FlatButton className='pull-right' label="set" onClick={() => {this.closePopover('score')}} primary={true} />
            <FlatButton className='pull-right' label="close" onClick={() => {this.closePopover('score')}} primary={true} />
          </Popover>
        </div>
      </div>
    )
  }
};