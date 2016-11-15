import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { validateJobHelper } from '../helpers/roleValidations';
import UibaDatePicker from '../../components/DatePicker';
import MulitselectPopover from '../../components/MulitselectPopover';
import Skills from 'components/skills/SkillList';

import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
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
      this.props.onRoleSave(this.props.role);
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

  handlePicklistChange = field => (e, index, value) => {
    this.changeProjectProps(field, value)
  }

  handleChange = field => (e, value) => {
    this.changeProjectProps(field, value)
  }

  onSetEduReq() {
    this.changeProjectProps('degreeRequirements', this.props.eduRequirements)
  }

  maxDegree(role, validationErrors) {
    const degrees = ['High School', 'Associate', 'Bachelor','Master','MBA','JD','MD','PhD','Engineer Degree','Certificate','Coursework','Other'];
    
    let splc = role.degreeMin ? degrees.indexOf(role.degreeMin) : 0

    const items = degrees.splice(splc, degrees.length).map((name) => {
      return (<MenuItem value={name} primaryText={name}/>)
    })

    return (
      <SelectField
        errorText={validationErrors.degreeMax}
        onChange={this.handlePicklistChange('degreeMax')}
        value={role.degreeMax}
        floatingLabelText="Max Education Level"
        hintText='Max Education Level'
      >
        {items}
      </SelectField>
    )
  }

  maxExperience(role, validationErrors) {
    const range = [0,1,2,3,4,5,6,7,8,9,10];
    
    const splc = role.experienceMin ? range.indexOf(role.experienceMin) : 0

    const items = range.splice(splc, range.length).map((name) => {
      let val = name;
      if (name === 0) val = '>1';
      if (name === 10) val = '10+';
      return (<MenuItem value={name} primaryText={val.toString()}/>)
    })

    return (
      <SelectField
        errorText={validationErrors.experienceMax}
        onChange={this.handlePicklistChange('experienceMax')}
        value={role.experienceMax}
        floatingLabelText="Max Education Level"
        hintText='Max Education Level'
      >
        {items}
      </SelectField>
    )
  }

  render () {
    const {
            validationErrors
          } = this.state;

    const {
            role,
            addVisible,
            eduRequirements,
            onToggleEduReqSelect,
          } = this.props;

    const isVisible = (role.description || addVisible) ? '' : ' ' + cx('closed');
    
    return (

      <div className={cx('roleAdd-container') + isVisible}>
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

          <div className="col-md-6">
            <MulitselectPopover
              data={['High School','Associate','Bachelor','Master','MBA','JD','MD','PhD','Engineer Degree','Certificate','Coursework','Other']}
              selected={eduRequirements}
              buttonText='Education Requirements'
              onToggleSelect={onToggleEduReqSelect}
              handleSet={this.onSetEduReq.bind(this)}
            />
          </div>

          <div className="col-md-6">
            <SelectField
              errorText={validationErrors.experienceMin}
              onChange={this.handlePicklistChange('experienceMin')}
              value={role.experienceMin}
              floatingLabelText="Minimum Experience Level"
              hintText='Minimum Experience Level'
            >
              <MenuItem value={0} primaryText='>1'/>
              <MenuItem value={1} primaryText='1'/>
              <MenuItem value={2} primaryText='2'/>
              <MenuItem value={3} primaryText='3'/>
              <MenuItem value={4} primaryText='4'/>
              <MenuItem value={5} primaryText='5'/>
              <MenuItem value={6} primaryText='6'/>
              <MenuItem value={7} primaryText='7'/>
              <MenuItem value={8} primaryText='8'/>
              <MenuItem value={9} primaryText='9'/>
              <MenuItem value={10} primaryText='10+'/>
            </SelectField>
          </div>
          
          <div className="col-md-6">
            {this.maxExperience(role, validationErrors)}
          </div>

          <div className="col-md-6">

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
    eduRequirements: state.role.eduRequirements,
  };
}

export default connect(mapStateToProps, {})(RoleAdd);