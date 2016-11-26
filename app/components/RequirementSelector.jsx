import React, { PropTypes } from 'react';

import Popover from 'material-ui/Popover';
import DuelSlider from 'components/DuelSlider';
import FlatButton from 'material-ui/FlatButton';
import RoleSkills from 'components/roles/RoleSkillList';
import RoleLocation from 'containers/RoleLocation'
import RaisedButton from 'material-ui/RaisedButton';
import MulitselectPopover from 'components/MulitselectPopover';

import classNames from 'classnames/bind';
import styles from 'css/components/role';
const cx = classNames.bind(styles);

export default class RequirementSelectors extends React.Component {
  
  static PropTypes =  {
    role: PropTypes.object.isRequired,
    roles: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    onEditSave: PropTypes.func.isRequired,
    onSkillSave: PropTypes.func.isRequired,
    onSkillDelete: PropTypes.func.isRequired,
    toggleSkillAdd: PropTypes.func.isRequired,
    eduRequirements: PropTypes.func.isRequired,
    onToggleEduReqSelect: PropTypes.func.isRequired,
  }

  state = {
    validationErrors: {},
    experience: { open: false, anchorEl: null },
    skill: { open: false, anchorEl: null },
    location: { open: false, anchorEl: null },
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }

  sliderChange(val) {
    this.changeProjectProps('experienceMin', val[0])
    this.changeProjectProps('experienceMax', val[1])
  }
  onSetEduReq() {
    this.changeProjectProps('degreeRequirements', this.props.eduRequirements)
  }

  openExperience(e) {
    const sty = this.getAnchorPosition(e.currentTarget)
    this.setState({ experience: {
        open: true,
        anchorEl: e.currentTarget,
        style: {
          top: sty.top - 152,
          left: sty.left
        }
      }
    });
  }

  closePopover = (popover) => {
    this.setState({
      [popover]: {
        open: false, 
        anchorEl: null 
      }
    })
  }
  
  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  getAnchorPosition(el) {
    if (!el) {
      el = ReactDOM.findDOMNode(this);
    }

    const rect = el.getBoundingClientRect();
    const a = {
      top: rect.top,
      left: rect.left,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };

    a.right = rect.right || a.left + a.width;
    a.bottom = rect.bottom || a.top + a.height;
    a.middle = a.left + ((a.right - a.left) / 2);
    a.center = a.top + ((a.bottom - a.top) / 2);

    return a;
  }

  changeProjectProps(field, value) {
    this.setState({validationErrors: {}})
    this.props.roleChange({
      field: field,
      value: value,
      id: this.props.role._id
    });
  }

  openMultiSelect = (popover, e) => {
    this.setState({ [popover]: {
        open: true,
        anchorEl: e.currentTarget,
      }
    });
  };

  getTargetPosition(targetEl) {
    return {
      top: 0,
      center: targetEl.offsetHeight / 2,
      bottom: targetEl.offsetHeight,
      left: 0,
      middle: targetEl.offsetWidth / 2,
      right: targetEl.offsetWidth,
    };
  }
  
  experienceReposition() {
    if (this.state.experience.anchorEl) {
      const sty = this.getAnchorPosition(this.state.experience.anchorEl)
      this.setState({ experience: {
          open: true,
          anchorEl: this.state.experience.anchorEl,
          style: {
            top: sty.top - 152,
            left: sty.left
          }
        }
      });
    } else {
      return false;
    }
  }

  handleResize = () => {
    this.experienceReposition();
  };

  handleScroll = () => {
    this.experienceReposition()
  };

  render () {

    const {
      role,
      roles,
      messages,
      onEditSave,
      onSkillSave,
      onSkillDelete,
      toggleSkillAdd,
      eduRequirements,
      onToggleEduReqSelect,
    } = this.props;

    const {
      experience
    } = this.state;

    return (
      <div className={cx('req-container')}>
        
        <p className={cx('req-title')}>Role Requirements:</p>

        <div className={cx('req-btns') +" col-md-3"}>
          <MulitselectPopover
            data={['High School','Associate','Bachelor','Master','MBA','JD','MD','PhD','Engineer Degree','Certificate','Coursework','Other']}
            selected={eduRequirements}
            buttonText='Edu Requirements'
            onToggleSelect={onToggleEduReqSelect}
            handleSet={this.onSetEduReq.bind(this)}
          />
        </div>

        <div className={cx('req-btns') +" col-md-3"}>
          <RaisedButton
            labelStyle={{fontSize: '10px', paddingLeft: '9px', paddingRight: '9px'}}
            onClick={(e) => {this.openExperience(e)}}
            label='Exp Requirements'
          />
          {experience.open ? (
            <div className={cx('experience-selector')} style={{...experience.style}}>
                <h5 className={cx('experience-title')}>Experience Range Selector</h5>
                <p className={cx('experience-sub-title')}>Length of Use (Yrs)</p>
                <DuelSlider
                  dataSource={[role.experienceMin, role.experienceMax]}
                  title="Length of Use (Yrs)"
                  field={'lengthOfUse'}
                  style={{width: '90%', zIndex: 100}}
                  handleChange={this.sliderChange.bind(this)}
                  storeValue={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  stages={['>1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']}
                >
                  <div className="handle handle-0"/>
                  <div className="handle handle-1"/>
                </DuelSlider>
                
                <FlatButton className='pull-right' label="set" onClick={() => {this.closePopover('experience')}} primary={true} />
                <FlatButton className='pull-right' label="close" onClick={() => {this.closePopover('experience')}} primary={true} />
              </div>
            ) : (null)}

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
              skills={roles.skills}
              addVisible={roles.showSkillAdd}
              errorMessage={messages.errorMessage}
              toggleSkillAdd={toggleSkillAdd}
              onEditSave={onEditSave} 
              onSkillSave={onSkillSave} 
              onSkillDelete={onSkillDelete} 
            />
            <FlatButton className='pull-right' label="set" onClick={() => {this.closePopover('skill')}} primary={true} />
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
            <RoleLocation/>
            <FlatButton className='pull-right' label="set" onClick={() => {this.closePopover('location')}} primary={true} />
            <FlatButton className='pull-right' label="close" onClick={() => {this.closePopover('location')}} primary={true} />
          </Popover>
        </div>
      </div>
    )
  }
};