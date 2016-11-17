import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Roles from 'containers/Roles'
import RoleList from 'components/roles/RoleList'

import * as roleActionCreator from 'actions/roles'

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

class CompanyDashboard extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.actions.fetchRoles(this.props.company._id)
  }

  render() {
    const {
      role,
      roles,
      addShow,
      company,
      actions
    } = this.props;

    return (
      <div>
        <RoleList
          role={role}
          roles={roles}
          company={company}
          addVisible={addShow}
          onEditSave={actions.updateRole}
          toggleRoleAdd={actions.toggleRoleAdd}
          roleChange={actions.roleChange}
          rolesChange={actions.rolesChange}
          onRoleSave={actions.createRole}
          onToggleEduReqSelect={actions.toggleEduReqSelect}
        />
      </div>
    )
  }
};

CompanyDashboard.propTypes = {
  role: PropTypes.object,
  roles: PropTypes.array,
  addShow: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    role: state.role.role,
    roles: state.role.roles,
    addShow: state.role.addShow,
    company: state.company.company,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(roleActionCreator, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDashboard);