import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoleItem from 'components/roles/RoleItem';
import RoleAdd from 'components/roles/RoleAdd';
import RoleEdit from 'components/roles/RoleEdit';
import NullProfItem from 'components/ProfileNull';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

import classNames from 'classnames/bind';
import styles from 'css/components/role';
import moment from 'moment';
const cx = classNames.bind(styles);

class RoleList extends React.Component {
  
  static propTypes = {
    role: PropTypes.object,
    roles: PropTypes.array,
    roleEdit: PropTypes.object,
    addVisible: PropTypes.bool.isRequired,
    editShow: PropTypes.bool.isRequired,
    onEditSave: PropTypes.func.isRequired,
    toggleRoleAdd: PropTypes.func.isRequired,
    onRoleSave: PropTypes.func.isRequired,
    roleChange: PropTypes.func.isRequired,
    roleEditChange: PropTypes.func.isRequired,
    rolesChange: PropTypes.func.isRequired,
    onToggleEduReqSelect: PropTypes.func.isRequired,

  }

  constructor(props) {
    super(props);
  }

  state = {
    copiedPath: ''
  }
  
  toggleAddRole = () => {
    this.props.toggleRoleAdd(this.props.addVisible)
  }

  handleSave = (data) => {
    this.props.onRoleSave(data);
    this.props.toggleRoleAdd(this.props.addVisible)
  }

  handleEdit = (data) => {
    this.props.onEditSave(data);
    this.props.toggleRoleEdit();
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleCopied(path) {
    this.setState({copiedPath: path})
  }

  render () {
    const { role,
            roles,
            company,
            roleEdit,
            editShow,
            addVisible,
            roleChange,
            rolesChange,
            roleEditChange,
            toggleRoleEdit,
          } = this.props;

    const { copiedPath } = this.state

    const renderItems = (
      <div>
        <h4>Created Roles:</h4>
        <Table
          selectable={true}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            selectable={true}
            >
            <TableRow>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Create Date</TableHeaderColumn>
              <TableHeaderColumn>Applicant Count</TableHeaderColumn>
              <TableHeaderColumn>Apply Url</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover={true}
            stripedRows={true}
          >
            {roles.map((_role, i) => {
    
              return (<RoleItem
                key={_role._id} 
                role={_role}
                copiedPath={this.handleCopied.bind(this)}
                copiedLabel={copiedPath === _role.applicantCode ? 'Copied' : 'Copy Share Link'}
                company={company}
                toggleRoleEdit={toggleRoleEdit}
                rolesChange={rolesChange}
                onRoleSave={this.handleEditSave} 
              />);
            })}
          </TableBody>
        </Table>
      </div>
    )
    
    return ( <div className={cx('roleList--container')}>
      
      { roles.length ? (
        <div>
          {renderItems}
        </div>
      ) : (
        <span>
          <div className={cx('banner')}>Welcome to {company.name} Admin Portal. To get started click create new role. Place cursor over any element for more information</div>
        </span>
      )}

      <RoleEdit
        role={roleEdit}
        onRoleSave={this.handleEdit}
        roleChange={roleEditChange}
        toggleEdit={toggleRoleEdit} 
        editShow={editShow}
      />

      <RoleAdd
        role={role}
        company={company}
        onRoleSave={this.handleSave} 
        roleChange={roleChange}
        toggleEdit={this.toggleAddRole.bind(this)} 
        addVisible={addVisible}
      />

    </div>)
  }
};

export default RoleList