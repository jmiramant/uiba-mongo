import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as rolesActionCreators from 'actions/roles';

import RoleItem from 'components/roles/RoleItem';
import RoleAdd from 'components/roles/RoleAdd';
import NullProfItem from 'components/ProfileNull';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/roleList';
import moment from 'moment';
const cx = classNames.bind(styles);

class RoleList extends React.Component {
  
  static propTypes = {
    roles: PropTypes.array,
    addVisible: PropTypes.bool.isRequired,
    onEditSave: PropTypes.func.isRequired,
    toggleRoleAdd: PropTypes.func.isRequired,
    onRoleSave: PropTypes.func.isRequired,
    onRoleDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }
  
  toggleAddRole = () => {
    this.props.toggleRoleAdd(this.props.addVisible)
  }

  handleSave = (data) => {
    this.props.onRoleSave(data);
    this.props.toggleRoleAdd(this.props.addVisible)
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (role) => {
    this.props.onRoleDelete(role);
  }

  render () {
    const { role,
            roles,
            addVisible,
            actions
          } = this.props;
    const lengthIndex = roles.length - 1;

    const renderItems = (
      <div>
        {roles.map((_role, i) => {
            return (<RoleItem 
                      key={_role._id} 
                      role={_role} 
                      roleChange={actions.rolesChange}
                      handleDelete={this.handleDelete}
                      saveRoleEdit={this.handleEditSave} 
                      isntLast={lengthIndex !== i} 
                    />);
        })}
      </div>
    )
    
    return ( <div className={cx('roleList--container')}>
      
      { roles.length ? (
        <div>
          {renderItems}
        </div>
      ) : (
        <span>
          <NullProfItem target="role" />
        </span>
      )}

      <RoleAdd
        role={role}
        onRoleSave={this.handleSave} 
        roleChange={actions.roleChange}
        toggleEdit={this.toggleAddRole.bind(this)} 
        addVisible={addVisible}
      />

    </div>)
  }
};

function mapStateToProps(state) {
  return {
    role: state.role.role
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(rolesActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleList);