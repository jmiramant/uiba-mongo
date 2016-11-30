import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ApplicantFilters from 'components/applicants/ApplicantFilter';
import * as roleActionCreator from 'actions/roles';
import * as addressActionCreator from 'actions/address'
import * as applicantActionCreator from 'actions/applicants'
import classNames from 'classnames/bind';
import styles from 'css/common/filtering';
const cx = classNames.bind(styles);

class ApplicantFiltersController extends Component {

  constructor(props) {
    super(props);
  }
  
  state = {
    role: undefined
  }

  componentDidUpdate(props) {
    const { role, applicantActions} = props;
    if (role.role._id && !this.state.role) {

      let range = {}
      if (role.role.range.range) {
        range.range = role.role.range.range;
        range.zip = role.role.range.zip;
      }
      applicantActions.fetchFilterSkills(role.role.skills);

      applicantActions.filterChange({
        school: role.role.degreeRequirements,
        skill: role.role.skills,
        address: range
      });

      this.setState({role: role.role._id});
    }

  }

  clearFilters() {
    this.props.addressActions.clearRangeAddress()
    this.props.applicantActions.clearFilters()
  }

  render() {
    const {
      role,
      address,
      messages,
      applicant,
      roleActions,
      applicantLength,
      applicantActions,
    } = this.props;
    
    return (
      <div>
        <ApplicantFilters
          role={role}
          address={address}
          messages={messages}
          clearFilters={this.clearFilters.bind(this)}
          filters={applicant.filters}
          skill={applicant.skillFilter}
          skills={applicant.skillsFilter}
          showSkillAdd={applicant.showSkillAdd}
          eduRequirements={applicant.educationFilter}
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
  };
}

function mapDispatchToProps (dispatch) {
  return {
    roleActions: bindActionCreators(roleActionCreator, dispatch),
    applicantActions: bindActionCreators(applicantActionCreator, dispatch),
    addressActions: bindActionCreators(addressActionCreator, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantFiltersController);
