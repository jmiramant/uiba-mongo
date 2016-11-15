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

  handleCandidateView(){

  }

  handleArchive() {
    const val = {...this.props.role}
    val.isArchived = true;
    this.props.rolesChange(val)
    this.archiveConfirm(val)
  }

  render () {
    const { 
            role,
            company,
            handleArchive
          } = this.props;
    
    return (

        
      <TableRow>
        <TableRowColumn>{role.title}</TableRowColumn>
        <TableRowColumn>{moment(new Date(role.createdAt)).format('MMM DD, YYYY')}</TableRowColumn>
        <TableRowColumn>{role.appliedCount}</TableRowColumn>
        <TableRowColumn>
          <CopyToClipboard text={window.location.origin + '/apply/' + company.name_lower + '/' + role.applicantCode}
            onCopy={() => this.setState({copied: true})}>
            <span>{company.name_lower}/{role.applicantCode}</span>
          </CopyToClipboard>
        </TableRowColumn>
        <TableRowColumn><FlatButton onClick={this.handleArchive.bind(this)} label="Archive" primary={true} /></TableRowColumn>
        <TableRowColumn>
          <Link to={'/company-admin/applicants/' + role._id }>
            <FlatButton label="View Applicants" primary={true} />
          </Link>
        </TableRowColumn>
      </TableRow>
    )

  }
};

            
