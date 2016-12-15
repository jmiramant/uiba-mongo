import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import ScoreSlider from 'components/ScoreSlider';
import FlatButton from 'material-ui/FlatButton';
import RoleSkills from 'components/roles/RoleSkillList';
import FilterPersist from 'components/applicants/FilterPersistDropdown';
import RaisedButton from 'material-ui/RaisedButton';
import MulitselectPopover from 'components/MulitselectPopover';
import LocationFilterController from 'containers/LocationFilterController'
import classNames from 'classnames/bind';
import roleStyles from 'css/components/role';
import styles from 'css/components/applicantFilter';
const cx = classNames.bind(roleStyles);
const cy = classNames.bind(styles);

export default class ApplicantFiler extends React.Component {
  
  static PropTypes =  {
    role: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
    messages: PropTypes.object.isRequired,
    setFilters: PropTypes.object.isRequired,
    onSelectFilter: PropTypes.func.isRequired,
    onEditSave: PropTypes.func.isRequired,
    onSkillSave: PropTypes.func.isRequired,
    onFilterSave: PropTypes.func.isRequired,
    filterChange: PropTypes.func.isRequired,
    onSkillDelete: PropTypes.func.isRequired,
    onDeleteFilter: PropTypes.func.isRequired,
    toggleSkillAdd: PropTypes.func.isRequired,
    eduRequirements: PropTypes.func.isRequired,
    onToggleEduReqSelect: PropTypes.func.isRequired,
  }

  state = {
    validationErrors: {},
    skill: { open: false, anchorEl: null },
    location: { open: false, anchorEl: null },
    score: { open: false, anchorEl: null },
    skillError: undefined
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
    if ( (Object.keys(f).length >= 1) && ( (f.school && f.school.length > 0) || ((f.score && f.score.min >=0) || (f.score && f.score.max)) || (f.skill && f.skill.length > 0) || ( f.address && (Object.keys(f.address).length > 0 || f.address.length > 0)))) {
      return true;
    } else {
      return false;
    };
  }
  
  filterRemove = (filter) => (e) => {
    this.props.removeFilter(filter)
  }

  onSkillSave(skill) {
    const { skills, onSkillSave } = this.props;
    if (_.filter(skills, (s) => {return s.type === skill.type}).length) {
      this.setState({skillError: 'This skill has already been added.'});
      setTimeout(() => {
        this.setState({skillError: undefined});
      }, 4000)
    } else {  
      onSkillSave(skill);
    }

  }

  render () {

    const {
      role,
      skill,
      skills,
      address,
      filters,
      setFilters,
      messages,
      onEditSave,
      skillChange,
      onSkillSave,
      fetchFilters,
      isApplicants,
      filterChange,
      onFilterSave,
      skillsChange,
      clearFilters,
      showSkillAdd,
      onSkillDelete,
      onDeleteFilter,
      onSelectFilter,
      toggleSkillAdd,
      eduRequirements,
      onToggleEduReqSelect,
    } = this.props;

    const { skillError } = this.props;

    const isFilterSet = this.isFilters(setFilters);

    return (
      <div className={cx('req-container') + " " + cy('filter-container')}>

        <div className={cy('header-container')}>
          <p className={cx('req-title') + " " + cy('filter-title')}>Filter Candidates</p>
          <div className={cy('filter-state') + ' pull-right'}>
            {role.role._id && isApplicants ? (
              <FilterPersist
                role={role.role}
                filters={filters}
                isFilterSet={isFilterSet}
                setFilters={setFilters}
                fetchFilters={fetchFilters}
                onDeleteFilter={onDeleteFilter}
                onSelectFilter={onSelectFilter}
                handleFilterSave={onFilterSave}
              />
            ) : (null)}
            { isFilterSet ? (
              <span>
                <RaisedButton style={{margin: '0 10px'}} labelStyle={{fontSize: '11px'}} className={cy('filter-btn')} label="clear filters" onClick={clearFilters} primary={true} />
              </span>
            ) : (null)}
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
          {setFilters.school && setFilters.school.length ? (
            <div className={cy('enabled-filters', 'list', 'school-filter')}>
              {setFilters.school.map((f,i) => (
                <Chip
                  onRequestDelete={ this.filterRemove({type: 'school', value: f}) }
                  style={{backgroundColor: '#fff', margin: '3px', display: 'inline-flex'}}
                  labelStyle={{fontSize: '11px'}}
                  key={f + i}
                >{f}</Chip>
              ))}
            </div>
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
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            anchorEl={this.state.skill.anchorEl}
            style={{width: '800px', minHeight: '510px'}}
          >
            <RoleSkills
              skill={skill}
              skills={skills}
              addVisible={showSkillAdd}
              onEditSave={onEditSave} 
              onSkillSave={this.onSkillSave.bind(this)} 
              errorText={skillError}
              skillChange={skillChange}
              skillsChange={skillsChange}
              errorMessage={skillError}
              onSkillDelete={onSkillDelete} 
              toggleSkillAdd={toggleSkillAdd}
            />
            <FlatButton className='pull-right' label="set" onClick={this.skillSet.bind(this)} primary={true} />
            <FlatButton className='pull-right' label="close" onClick={() => {this.closePopover('skill')}} primary={true} />
          </Popover>
          {setFilters.skill && setFilters.skill.length > 0 ? (
            <ul className={cy('enabled-filters', 'list')}>
              {setFilters.skill.map((f,i) => (
                <span key={f.type + i}>
                  <li className={cy('enabled-filter-item', 'skill-filter')} >Min. <span className={cy('strong')}>{f.lengthOfUse} yrs</span> in <span className={cy('strong')}>{f.type}</span> with at least <span className={cy('strong')}>'{['Learning', 'Intermediate', 'Competent', 'Expert'][f.proficiency - 1]}'</span> proficiency</li>
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
          {setFilters.address && setFilters.address.zip ? (
            <div className={cy('enabled-filters', 'enabled-filter-item', 'skill-filter')}>Applicants <span className={cy('strong')}>{setFilters.address.range}</span> mile radius of <span className={cy('strong')}>{setFilters.address.zip}</span></div>
          ) : (null)}
        </div>

        <ScoreSlider 
          role={role}
          onSet={filterChange}
          scoreFilter={setFilters.score}
        />

      </div>
    )
  }
};