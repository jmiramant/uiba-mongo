import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ApplicantFilters from 'components/applicants/ApplicantFilter';
import * as roleActionCreator from 'actions/roles';
import * as addressActionCreator from 'actions/address'
import * as applicantActionCreator from 'actions/applicants'
import * as filterActionCreator from 'actions/filters'
import classNames from 'classnames/bind';
import styles from 'css/common/filtering';
const cx = classNames.bind(styles);

class ApplicantFiltersController extends Component {

  constructor(props) {
    super(props);
  }

  clearFilters() {
    this.props.addressActions.clearRangeAddress()
    this.props.applicantActions.clearFilters()
  }

  render() {
    const {
      role,
      filter,
      address,
      messages,
      applicant,
      filterActions,
      applicantLength,
      applicantActions,
    } = this.props;

    return (
      <div>
        <ApplicantFilters
          role={role}
          address={address}
          messages={messages}
          filters={filter.filters}
          isApplicants={applicant.applicants.length > 0}
          setFilters={applicant.filters}
          skill={applicant.skillFilter}
          skills={applicant.skillsFilter}
          clearFilters={this.clearFilters.bind(this)}
          removeFilter={applicantActions.removeFilter}
          skillChange={applicantActions.skillChange}
          skillsChange={applicantActions.skillsChange}
          showSkillAdd={applicant.showSkillAdd}
          eduRequirements={applicant.educationFilter}
          onFilterSave={filterActions.createFilter}
          fetchFilters={filterActions.fetchFilters}
          onDeleteFilter={filterActions.deleteFilter}
          onSelectFilter={applicantActions.updateFilters}
          onToggleEduReqSelect={applicantActions.toggleEduReqSelect}
          filterChange={applicantActions.filterChange}
          toggleSkillAdd={applicantActions.toggleRoleSkillsAdd}
          onEditSave={applicantActions.updateSkill} 
          onSkillSave={applicantActions.createSkill} 
          onSkillDelete={applicantActions.deleteSkill} 
        />
        <div>Showing {applicantLength} of {applicant.applicants.length}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    role: state.role,
    address: state.address,
    messages: state.message,
    applicant: state.applicant,
    filter: state.filter
  };
}

function mapDispatchToProps (dispatch) {
  return {
    applicantActions: bindActionCreators(applicantActionCreator, dispatch),
    addressActions: bindActionCreators(addressActionCreator, dispatch),
    filterActions: bindActionCreators(filterActionCreator, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantFiltersController);
