/* eslint-disable import/no-extraneous-dependencies */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RoleList from 'components/roles/RoleList';
import * as roleActionCreator from 'actions/roles';
import * as applicantActionCreator from 'actions/applicants';
import classNames from 'classnames/bind';
import styles from 'css/components/companyDashboard';

const cx = classNames.bind(styles);

class CompanyDashboard extends Component {

  componentWillMount() {
    this.props.roleActions.fetchRoles(this.props.company._id);
    this.state = {
      copiedLabel: 'Copy General Apply Link'
    };
  }

  render() {
    const {
      role,
      roles,
      addShow,
      company,
      roleActions,
      editShow,
      roleEdit,
    } = this.props;

    const {
      copiedLabel,
    } = this.state;

    return (
      <div>
        <div className={cx('general-applicants-container')}>

          <div className={' col-md-6'}>
            <CopyToClipboard
                text={window.location.origin + '/apply/' + company.name_lower}
                onCopy={() => { this.setState({copied: true, copiedLabel: 'General Apply Link Copied'}); }}
            >
              <RaisedButton
                style={{width: '100%'}}
                labelStyle={{fontSize: '10px', paddingLeft: '9px', paddingRight: '9px'}}
                label={copiedLabel}
              />
            </CopyToClipboard>
          </div>

          <div className={' col-md-6'}>
            <Link to={'/company-admin/applicants/company/' + company._id}>
              <RaisedButton
                style={{width: '100%'}}
                label={'View All ' + company.name + ' Applicants'}
                labelStyle={{fontSize: '10px', paddingLeft: '9px', paddingRight: '9px'}}
                primary={true} //eslint-disable-line
              />
            </Link>
          </div>
        </div>

        <RoleList
          role={role}
          roles={roles}
          roleEdit={roleEdit}
          company={company}
          addVisible={addShow}
          editShow={editShow}
          onEditSave={roleActions.updateRole}
          toggleRoleAdd={roleActions.toggleRoleAdd}
          toggleRoleEdit={roleActions.toggleRoleEdit}
          roleChange={roleActions.roleChange}
          roleEditChange={roleActions.roleEditChange}
          rolesChange={roleActions.rolesChange}
          onRoleSave={roleActions.createRole}
          onToggleEduReqSelect={roleActions.toggleEduReqSelect}
        />
      </div>
    );
  }
}

CompanyDashboard.propTypes = {
  role: PropTypes.object,
  roles: PropTypes.array,
  roleEdit: PropTypes.object,
  addShow: PropTypes.bool,
  editShow: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    role: state.role.role,
    roles: state.role.roles,
    addShow: state.role.addShow,
    company: state.company.company,
    roleEdit: state.role.roleEdit,
    editShow: state.role.editShow,
    applicants: state.applicant.applicants,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    roleActions: bindActionCreators(roleActionCreator, dispatch),
    applicantActions: bindActionCreators(applicantActionCreator, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDashboard);
