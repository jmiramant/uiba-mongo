import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import RoleAdd from 'components/roles/RoleAdd';
import ReactDOM from 'react-dom';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import CopyToClipboard from 'react-copy-to-clipboard';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/role';
const cx = classNames.bind(styles);

export default class RoleItem extends React.Component {
  
  static propTypes = {
    role: PropTypes.object.isRequired, 
    company: PropTypes.object.isRequired,
    rolesChange: PropTypes.func.isRequired,
    onRoleSave: PropTypes.func.isRequired,
    copiedLabel:  PropTypes.string.isRequired,
    copiedPath: PropTypes.func.isRequired,
    toggleRoleEdit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  state = {
    copied: false,
    validationErrors: {},
  }

  archiveConfirm(val) {
    const r = confirm("Are you sure you want to archive this role? There are applicants associated with it.");
    if (r == true) {
      this.props.onRoleSave(val)
    }
  }

  handleArchive() {
    const val = {...this.props.role}
    val.isArchived = true;
    this.props.rolesChange(val)
    this.archiveConfirm(val)
  }

  applicantViewActive(role) {
    return role.appliedCount > 0 ? false : true
  }

  editRole() {
    const { role, toggleRoleEdit } = this.props;
    toggleRoleEdit(role);
  }

  render () {
    const { 
      role,
      company,
      copiedLabel,
      copiedPath,
      handleArchive
    } = this.props;

    return (
        
      <TableRow>
        <TableRowColumn>{role.title}</TableRowColumn>
        <TableRowColumn>{moment(new Date(role.createdAt)).format('MMM DD, YYYY')}</TableRowColumn>
        <TableRowColumn>{role.appliedCount}</TableRowColumn>
        <TableRowColumn style={{paddingLeft: '0px', paddingRight: '10px'}} >
          <CopyToClipboard text={window.location.origin + '/apply/' + company.name_lower + '/' + role.applicantCode}
            onCopy={() => { this.setState({copied: true}); copiedPath(role.applicantCode)}}>
              <FlatButton labelStyle={{fontSize: '12px'}} style={{paddingLeft: '0px', paddingRight: '10px'}} label={copiedLabel} primary={true} disabled={copiedLabel === 'Copied'} />
          </CopyToClipboard>
        </TableRowColumn>
        <TableRowColumn style={{width: '100px'}}><FlatButton style={{paddingLeft: '0px', paddingRight: '10px'}} labelStyle={{fontSize: '12px'}} onClick={this.editRole.bind(this)} label="Edit" primary={true} /></TableRowColumn>
        <TableRowColumn><FlatButton labelStyle={{fontSize: '12px'}} onClick={this.handleArchive.bind(this)} label="Delete" primary={true} /></TableRowColumn>
        <TableRowColumn>
          {this.applicantViewActive(role) ? (
              <FlatButton labelStyle={{fontSize: '12px'}} label="View Applicants" primary={true} disabled={this.applicantViewActive(role)} />
          ) : (
            <Link to={'/company-admin/applicants/' + role._id }>
              <FlatButton labelStyle={{fontSize: '12px'}} label="View Applicants" primary={true} disabled={this.applicantViewActive(role)} />
            </Link>
          )}
        </TableRowColumn>
      </TableRow>
    )

  }
};

            
