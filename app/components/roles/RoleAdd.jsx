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

export default class RoleAdd extends React.Component {

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

  render () {
    const {
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
              onClick={(e) => {this.openMultiSelect('experience', e)}}
              label='Exp Requirements'
            />
            <Popover
              open={this.state.experience.open}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
              anchorEl={this.state.experience.anchorEl}
              style={{height: '150px', width: '400px'}}
            >
              <div className={cx('experience-selector')}>
                <h5 className={cx('experience-title')}>Experience Range Selector</h5>
                <p className={cx('experience-sub-title')}>Length of Use (Yrs)</p>
                <DuelSlider
                  dataSource={[role.experienceMin, role.experienceMax]}
                  title="Length of Use (Yrs)"
                  field={'lengthOfUse'}
                  style={{width: '90%'}}
                  handleChange={this.sliderChange.bind(this)}
                  storeValue={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  stages={['>1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']}
                />
                <FlatButton className='pull-right' label="set" onClick={() => {this.closePopover('experience')}} primary={true} />
              </div>
            </Popover>
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