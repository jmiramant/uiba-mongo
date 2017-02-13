import React from 'react';
import { connect } from 'react-redux';
import ApplicantListItem from 'components/applicants/ApplicantListItem'; // eslint-disable-line import/no-extraneous-dependencies
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

// eslint-disable-next-line react/prefer-stateless-function
class ApplicantList extends React.Component {

  render() {
    const {
      company,
      applicants,
    } = this.props;


    return (
      <div>

        <Table
          selectable={true} // eslint-disable-line react/jsx-boolean-value
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            >
            <TableRow>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover={true} // eslint-disable-line react/jsx-boolean-value
            stripedRows={true} // eslint-disable-line react/jsx-boolean-value
          >
            {applicants.map((_applicant) => {
              return (
                <TableRow>
                  <TableRowColumn>{_applicant.firstName}</TableRowColumn>
                  <TableRowColumn>{_applicant.lastName}</TableRowColumn>
                </TableRow>);
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    company: state.company.company,
    applicants: state.applicant.applicants,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantList);
