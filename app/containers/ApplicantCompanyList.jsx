import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ApplicantShow from 'containers/ApplicantShow';
import RoleRequirements from 'components/RoleRequirements';
import ApplicantFilterController from 'containers/ApplicantFiltersController';
import ApplicantListItem from 'components/applicants/CompanyApplicantListItem';
import FilteredApplicantSelector from 'selectors/FilteredApplicantSelector';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

import * as roleActionCreator from 'actions/roles';
import * as applicantActionCreator from 'actions/applicants';
import * as addressActionCreator from 'actions/address';
import * as scoreActionCreator from 'actions/score';
import * as messageActionCreator from 'actions/messages';

import classNames from 'classnames/bind';
import styles from 'css/components/applicantList';
const cx = classNames.bind(styles);

class ApplicantList extends React.Component {

  componentDidMount() {
    const {
      params,
      company,
      applicantActions
    } = this.props;

    applicantActions.fetchCompanyApplicants(params.companyId);
  }

  state = {
    score: true,
    prevSkills: [],
    dimensions: {width: 0}
  }

  componentDidUpdate(prevProps, prevState) {
    const { roles: { skills }, score, applicantsBase } = this.props;
    const { prevSkills } = this.state;
    const isScoreFetching = !score.isFetching;
    const isApplicantListLoaded = applicantsBase.length > 0;

    if (isApplicantListLoaded && !_.isEqual(prevSkills, skills) || ( !isScoreFetching && prevSkills.length === 0)) {
      this.fetchScores(applicantsBase, skills);
      this.setState({prevSkills: skills});
    }
  }

  fetchScores(applicantsBase, skills) {
    const { scoreActions } = this.props
    const profIds = applicantsBase.map( (p) => { return p._id});
    scoreActions.fetchScores(profIds, skills);
  }

  clearFilters() {
    this.props.scoreActions.clearScores();
    this.props.addressActions.clearRangeAddress();
    this.props.applicantActions.clearFilters();
  }

  setScore(_id) {
    const score = _.filter(this.props.score.scores, (s) => {
      return s.profile_id === _id.toString();
    })[0];

    if (score) {
      return score.score.toString();
    } else {
      if (this.props.score.scores.length === 0) {
        return null
      } else {
        return '-';
      }
    }
  }

  componentWillUnmount() {
    this.clearFilters();
  }

  updateRoleSkills(_skill) {
    const { role: { _id } , roles, roleActions } = this.props;
    const i = _.findIndex(roles.skills, (s) => {return s.type === _skill.type});
    const skills = [...roles.skills];
    i !== -1 ? skills[i] = _skill : skills.push(_skill)
    roleActions.updateSkills({_id, skills });
  }

  handleSkillDelete(_skill) {
    const { role: { _id }, messageActions, roles: { skills }, roleActions } = this.props;
    if (skills.length > 3) {
      const i = _.findIndex(skills, (s) => {return s.type === _skill.type});
      const _skills = [...skills];
      _skills.splice(i, 1);
      roleActions.updateSkills({_id, skills: _skills});
    } else {
      messageActions.createMessage('You must keep at least 3 Role Skill Requirements');
    }
  }

  toggleSkillEdit(skill) {
    this.props.roleActions.toggleApplicantRoleSkill(skill)
  }

  render() {

    const {
      role,
      roles,
      score,
      company,
      messages,
      applicants,
      roleActions
    } = this.props;

    const { dimensions } = this.state;

    return (
      <div>
        <h4>All {company.name} Applicants</h4>

        <ApplicantFilterController
          applicantLength={applicants.length}
        />

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
              <TableHeaderColumn>Role</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover={true}
            stripedRows={true}
          >
            {applicants.map((_applicant, i) => {
              return (<ApplicantListItem
                key={_applicant._id}
                applicant={_applicant}
                company={company}
                score={this.setScore(_applicant._id)}
                isScoreFetching={score.isFetching}
                role={role}
              />);
            })}
          </TableBody>
        </Table>
        { applicants.length ? (null) : (<div onClick={this.clearFilters.bind(this)} className={cx('no-results')}>No applicants fit these filters. Click to clear filters.</div>)}

      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    role: state.role.role,
    roles: state.role,
    score: state.score,
    scores: state.score.scores,
    company: state.company.company,
    applicants: FilteredApplicantSelector(state),
    applicantsBase: state.applicant.applicants,
    roleFetching: state.role.isFetching,
    messages: state.message,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addressActions: bindActionCreators(addressActionCreator, dispatch),
    applicantActions: bindActionCreators(applicantActionCreator, dispatch),
    scoreActions: bindActionCreators(scoreActionCreator, dispatch),
    messageActions: bindActionCreators(messageActionCreator, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantList);
