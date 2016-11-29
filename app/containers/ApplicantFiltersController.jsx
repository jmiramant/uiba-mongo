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
    if (props.role.role._id && !this.state.role) {
      // this.props.role.role.skills
      this.props.applicantActions.filterChange({
        school: this.props.role.role.degreeRequirements,
        skill: this.props.role.role.skills,
      });
      this.setState({role: props.role.role._id});
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
          messages={messages}
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
        <div>Showing {applicantLength} of {applicant.applicants.length} <span className={cx("clear")}onClick={this.clearFilters.bind(this)}>Clear</span></div>
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
