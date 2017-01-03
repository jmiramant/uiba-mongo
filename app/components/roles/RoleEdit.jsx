import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as roleActionCreators from 'actions/roles';

import { validateRoleHelper } from '../helpers/roleValidations';
import ErrorMessage from 'components/ErrorMessage';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import RoleRequirements from 'components/RoleRequirements';
import RadarChart from 'components/d3/chart';
import Measure from 'react-measure';

import classNames from 'classnames/bind';
import styles from 'css/components/role';
const cx = classNames.bind(styles);
let timeout;

class RoleEdit extends React.Component {

  static propTypes = {
    role: PropTypes.object.isRequired,
    editShow: PropTypes.bool,
    roleChange: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    onRoleSave: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  state = {
    validationErrors: {},
    dimensions: {width: 0}
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {
      this.props.onRoleSave(this.props.role);
    }

  }

  validate() {
    const validationResp = validateRoleHelper(this.props.role, this.props.role.skills, this.state.validationErrors);
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
  }

  handleChange = field => (e, value) => {
    this.changeProjectProps(field, value)
  }

  render () {
    const {
      dimensions,
      validationErrors
    } = this.state;

    const {
      role,
      roles,
      actions,
      messages,
      editShow,
      skillActions,
    } = this.props;
    
    return (

      <div className={cx('roleAdd-container') + ' col-md-offset-2 col-md-8'}>
        {editShow ? (
          <div>
            <h5 className={cx('role-title')}>Edit Role</h5>
            <form style={{minHeight: '170px'}}>

              <div className="col-md-12">
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

            </form>
            
            <ErrorMessage 
              errorText={validationErrors.skills}
            />
            <div className={cx('req-msg')}>To be effective, the role must include at least 3 knowledge, skill, and ability requirements. The Uiba algorithm uses these to determine applicant fit.</div>
            
            <RadarChart
              points={role.skills}
              style={{width: dimensions.width * 0.65, height: dimensions.width * 0.5}}
            />

            <Measure
              onMeasure={(dimensions) => {
                this.setState({dimensions})
              }}
            >
              <RoleRequirements
                skill={roles.editSkill}
                skills={role.skills}
                showSkillAdd={roles.showEditSkillAdd}
                messages={messages}
                fetchSkills={actions.fetchSkills}
                onEditSave={actions.updateEditSkill}
                onSkillSave={actions.editRoleSkillCreate}
                skillChange={actions.editRoleSkillChange}
                skillsChange={actions.skillsEditChange}
                onSkillDelete={actions.deleteEditSkill}
                toggleSkillAdd={actions.toggleRoleSkillsEdit}
              />
            </Measure>

            <div className={cx('profile-btn-group')}>
              <RaisedButton className='pull-right' type="submit" label="Save" onClick={this.handleSubmit} primary={true} />
              {this.props.handleDelete ? (
                <FlatButton className='pull-left' label="Delete" onClick={this.props.handleDelete} primary={true} />
              ) : (<span />)}
              <FlatButton className='pull-left' label="Close" onClick={this.props.toggleEdit} primary={true} />
            </div>
          </div>
        ) : (null)}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    roles: state.role,
    messages: state.message,
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
)(RoleEdit);