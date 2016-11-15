import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoleList from 'components/roles/RoleList'

import * as roleActionCreator from 'actions/roles'

class RolesApp extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.actions.fetchRoles(this.props.company.company_id)
  }

  render() {
    const {
      roles,
      actions
    } = this.props;

    return (
      <RoleList
        role={roles.role}
        roles={roles.roles}
        addVisible={roles.addShow}
        onEditSave={actions.updateRole}
        toggleRoleAdd={actions.toggleRoleAdd}
        roleChange={actions.roleChange}
        onRoleSave={actions.createRole}
        onRoleDelete={actions.deleteRole}
      />

    );
  }
}

function mapStateToProps(state) {
  return {
    roles: state.role,
    company: state.company.company
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(roleActionCreator, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesApp);
