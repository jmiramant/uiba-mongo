import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoleItem from 'components/roles/RoleItem';
import RoleAdd from 'components/roles/RoleAdd';
import RoleEdit from 'components/roles/RoleEdit';
import NullProfItem from 'components/ProfileNull';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import {Popover, OverlayTrigger} from 'react-bootstrap';
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
    // toggleSkillEdit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  state = {
    copiedPath: '',
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
            toggleSkillEdit
          } = this.props;

    const { copiedPath } = this.state


    const popoverTitle = (
      <Popover
        bsClass={cx('popover') + " popover"}
        id="popover-title"
        positionTop='-100'
      >
        Click role title to view or modify role requirements.
      </Popover>
    );

    const popoverCreated = (
      <Popover
        bsClass={cx('popover') + " popover"}
        id="popover-created"
        positionTop='-100'
      >
        Date the role was created by an admin.
      </Popover>
    );

    const popoverApplicantCount = (
      <Popover
        bsClass={cx('popover') + " popover"}
        id="popover-applicant-count"
        positionTop='-100'
      >
        Total number of applicants who applied for this role.
      </Popover>
    );

    const popoverApplyUrl = (
      <Popover
        bsClass={cx('popover') + " popover"}
        id="popover-apply-url"
        positionTop='-100'
      >
        Click to copy the URL for this role to your clipboard. Use the URL as the ‘Apply button’ on the job posting so applicants are brought to the Uiba platform for screening.
      </Popover>
    );

    const popoverDelete = (
      <Popover
        bsClass={cx('popover') + " popover"}
        id="popover-delete"
        positionTop='-100'
      >
        Click to delete this role. This will not delete the applicants, only the role.
      </Popover>
    );

    const popoverViewApplicants = (
      <Popover
        bsClass={cx('popover') + " popover"}
        id="popover-view-applicants"
        positionTop='-100'
      >
        Allows admin to see the applicants that applied for this role, ranked according to their fitness for the role.
      </Popover>
    );

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
              <TableHeaderColumn>
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="top"
                  overlay={popoverTitle}
                >
                  <span>Title</span>
                </OverlayTrigger>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="top"
                  overlay={popoverCreated}
                >
                  <span>Create Date</span>
                </OverlayTrigger>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="top"
                  overlay={popoverApplicantCount}
                >
                  <span>Applicant Count</span>
                </OverlayTrigger>
              </TableHeaderColumn>
              <TableHeaderColumn
                style={{textAlign: 'center'}}
              >
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="top"
                  overlay={popoverApplyUrl}
                >
                  <span>Apply Url</span>
                </OverlayTrigger>
              </TableHeaderColumn>
              <TableHeaderColumn
                style={{textAlign: 'center'}}
              >
                <span>Edit</span>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="top"
                  overlay={popoverDelete}
                >
                  <span>Delete</span>
                </OverlayTrigger>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="top"
                  overlay={popoverViewApplicants}
                >
                  <span>View Applicants</span>
                </OverlayTrigger>
              </TableHeaderColumn>
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
        // toggleSkillEdit={toggleSkillEdit}
        editShow={editShow}
      />

      <RoleAdd
        role={role}
        company={company}
        onRoleSave={this.handleSave} 
        roleChange={roleChange}
        toggleEdit={this.toggleAddRole.bind(this)}
        // toggleSkillEdit={toggleSkillEdit}
        addVisible={addVisible}
      />

    </div>)
  }
};

export default RoleList