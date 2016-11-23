import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as roleActionCreators from 'actions/roles';

import { validateJobHelper } from '../helpers/roleValidations';
import UibaDatePicker from '../../components/DatePicker';
import MulitselectPopover from '../../components/MulitselectPopover';
import DuelSlider from '../../components/DuelSlider';
import RoleSkills from 'components/roles/RoleSkillList';

import AddressInput from 'containers/Address'
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';

import moment from 'moment';
import _ from 'lodash';

import classNames from 'classnames/bind';
import styles from 'css/components/role';
const cx = classNames.bind(styles);
let timeout;

class RoleAdd extends React.Component {

  static propTypes = {
    role: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
    roleChange: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    addVisible: PropTypes.bool,
    onRoleSave: PropTypes.func.isRequired,
    onToggleEduReqSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  state = {
    validationErrors: {},
    experience: { open: false, anchorEl: null },
    skill: { open: false, anchorEl: null },
    location: { open: false, anchorEl: null },
  }

  componentDidMount() {
    this.setCompanyId();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }
  
  setCompanyId() {
    this.props.roleChange({
      field: 'company_id',
      value: this.props.company._id,
    });  
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {
      this.props.onRoleSave({...this.props.role, skills: this.props.roles.skills});
    }
  }
  
  validate() {
    const validationResp = validateJobHelper(this.props.role, this.state.validationErrors);
    this.setState({validationErrors: validationResp.errors});
    return validationResp.containsErrors;
  }

  changeProjectProps(field, value) {
    this.setState({validationErrors: {}})
    this.props.roleChange({
      field: field,
      value: value,
      id: this.props.role._id
    });
    if (!this.props.role.company_id) this.setCompanyId()
  }

  sliderChange(val) {
    this.changeProjectProps('experienceMin', val[0])
    this.changeProjectProps('experienceMax', val[1])
  }

  handlePicklistChange = field => (e, index, value) => {
    this.changeProjectProps(field, value)
  }

  handleChange = field => (e, value) => {
    this.changeProjectProps(field, value)
  }

  onSetEduReq() {
    this.changeProjectProps('degreeRequirements', this.props.eduRequirements)
  }

  closePopover = (popover) => {
    this.setState({
      [popover]: {
        open: false, 
        anchorEl: null 
      }
    })
  }

  openMultiSelect = (popover, e) => {
    this.setState({ [popover]: {
        open: true,
        anchorEl: e.currentTarget,
      }
    });
  };
  
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

  handleResize = () => {
    this.experienceReposition();
  };

  handleScroll = () => {
    this.experienceReposition()
  };

  render () {
    const {
            experience,
            validationErrors
          } = this.state;

    const {
            role,
            roles,
            actions,
            messages,
            addVisible,
            skillActions,
            eduRequirements,
            onToggleEduReqSelect,
          } = this.props;

    const isVisible = (role.description || addVisible) ? '' : ' ' + cx('closed');
    
    return (

      <div className={cx('roleAdd-container') + isVisible + ' col-md-offset-2 col-md-8'}>
        
        <h5 className={cx('role-title')}>Create a Role</h5>

        <form
          onSubmit={this.handleSubmit}
        >

          <div className="col-md-6">
            <TextField
              value={role.title}
              errorText={validationErrors.title}
              floatingLabelText="Title"
              onChange={this.handleChange('title')}
              hintText='ie: Sr. Software Engineer'
            />
          </div>

          <div className="col-md-12">
            <TextField
              style={{width: '75%'}}
              value={role.description}
              className={cx('description')}
              errorText={validationErrors.description}
              floatingLabelText="Description"
              onChange={this.handleChange('description')}
              multiLine={true}
              rows={1}
            />
          </div>

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
              style={{width: '700px'}}
            >
              <RoleSkills 
                skills={roles.skills}
                addVisible={roles.showSkillAdd}
                errorMessage={messages.errorMessage}
                toggleSkillAdd={actions.toggleRoleSkillsAdd}
                onEditSave={actions.updateSkill} 
                onSkillSave={actions.createSkill} 
                onSkillDelete={actions.deleteSkill} 
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
              style={{height: '150px', width: '400px'}}
            >
              <AddressInput/>
              <FlatButton className='pull-right' label="set" onClick={() => {this.closePopover('location')}} primary={true} />
              <FlatButton className='pull-right' label="close" onClick={() => {this.closePopover('location')}} primary={true} />
            </Popover>
          </div>


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

function mapStateToProps(state) {
  return {
    roles: state.role,
    messages: state.message,
    eduRequirements: state.role.eduRequirements,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(roleActionCreators, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleAdd);