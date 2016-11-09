import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ApplicantShow from 'containers/ApplicantShow';
import ApplicantListItem from 'components/applicants/ApplicantListItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

import * as roleActionCreator from 'actions/roles'
import * as applicantActionCreator from 'actions/applicants'

import classNames from 'classnames/bind';
import styles from 'css/components/applicantList';
const cx = classNames.bind(styles);

export default class ApplicantList extends React.Component {

  componentDidMount() {
    const {
      params,
      company,
      roleActions,
      applicantActions
    } = this.props;

    roleActions.fetchRole(params.roleId);
    applicantActions.fetchApplicants(params.roleId);
  }

  render() {

    const {
      role,
      company,
      applicants,
    } = this.props;
    
    return (
      <div>
        <h4>Applicants for {role.title}:</h4>
        <Table
          selectable={true}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            >
            <TableRow>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Apply Date</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover={true}
            stripedRows={true}
          >
            {applicants.map((applicant, i) => {
              return (<ApplicantListItem
                key={applicant._id} 
                applicant={applicant}
                company={company}
              />);
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
};

ApplicantList.propTypes = {
};

function mapStateToProps(state) {
  return {
    role: state.role.role,
    applicants: state.applicant.applicants,
    company: state.company.company,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    roleActions: bindActionCreators(roleActionCreator, dispatch),
    applicantActions: bindActionCreators(applicantActionCreator, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantList);