import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoleItem from 'components/roles/RoleItem';
import RoleAdd from 'components/roles/RoleAdd';
import NullProfItem from 'components/ProfileNull';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

import classNames from 'classnames/bind';
import styles from 'css/components/role';
import moment from 'moment';
const cx = classNames.bind(styles);

class RoleList extends React.Component {
  
  static propTypes = {
    role: PropTypes.object,
    roles: PropTypes.array,
    addVisible: PropTypes.bool.isRequired,
    onEditSave: PropTypes.func.isRequired,
    toggleRoleAdd: PropTypes.func.isRequired,
    onRoleSave: PropTypes.func.isRequired,
    roleChange: PropTypes.func.isRequired,
    rolesChange: PropTypes.func.isRequired,
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

  render () {
    const { role,
            roles,
            company,
            addVisible,
            roleChange,
            rolesChange
          } = this.props;

    const renderItems = (
      <div>
        <h4>Created Roles:</h4>
        <Table
          selectable={true}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            >
            <TableRow>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Create Date</TableHeaderColumn>
              <TableHeaderColumn>Applicant Count</TableHeaderColumn>
              <TableHeaderColumn>Apply Url</TableHeaderColumn>
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
                company={company}
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
          <NullProfItem target="role" />
        </span>
      )}

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