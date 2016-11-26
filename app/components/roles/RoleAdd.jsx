import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as roleActionCreators from 'actions/roles';

import { validateJobHelper } from '../helpers/roleValidations';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import RequirementSelector from 'components/RequirementSelector';

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

  setRangeObj(address) {
    if (this.props.address.rangeZips.length > 0) {
      return {
        included: this.props.address.rangeZips,
        range: this.props.address.range,
        zipCode: this.props.address.zip
      }
    } else {
      return {
        included: undefined,
        range: undefined,
        zipCode: undefined
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {
      const range = this.setRangeObj(this.props.address);
      this.props.onRoleSave({...this.props.role, skills: this.props.roles.skills, range: range});
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

  handleChange = field => (e, value) => {
    this.changeProjectProps(field, value)
  }

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
    
    const roleCreate = (
      <div>
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

          <RequirementSelector
            role={role}
            roles={roles}
            messages={messages}
            roleChange={this.props.roleChange}
            eduRequirements={eduRequirements}
            onToggleEduReqSelect={onToggleEduReqSelect}
            toggleSkillAdd={actions.toggleRoleSkillsAdd}
            onEditSave={actions.updateSkill} 
            onSkillSave={actions.createSkill} 
            onSkillDelete={actions.deleteSkill} 
          />


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

    return (

      <div className={cx('roleAdd-container') + isVisible + ' col-md-offset-2 col-md-8'}>
        {addVisible ? (
          <ExpandTransition open={true}>
            {roleCreate}
          </ExpandTransition>
        ):(
          <div className='pull-center'>
            <RaisedButton 
              label="Create New Role"
              fullWidth={true} 
              style={{margin: '20px 0'}}
              onClick={this.props.toggleEdit}
            />
          </div>
        )}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    roles: state.role,
    address: state.address,
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