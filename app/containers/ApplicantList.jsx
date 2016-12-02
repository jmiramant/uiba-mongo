import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ApplicantShow from 'containers/ApplicantShow';
import ApplicantFilterController from 'containers/ApplicantFiltersController';
import ApplicantListItem from 'components/applicants/ApplicantListItem';
import FilteredApplicantSelector from 'selectors/FilteredApplicantSelector';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

import * as roleActionCreator from 'actions/roles';
import * as applicantActionCreator from 'actions/applicants';
import * as addressActionCreator from 'actions/address';
import * as scoreActionCreator from 'actions/score';

import classNames from 'classnames/bind';
import styles from 'css/components/applicantList';
const cx = classNames.bind(styles);

class ApplicantList extends React.Component {

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

  state = {
    role: true,
    score: true
  }

  componentWillReceiveProps(props) {
    const { applicants, role, applicantActions, score, filters} = props;

    const isRoleSet = role._id;
    const isRoleFetching = !props.roleFetching;
    const isRoleFuncCalled = this.state.role;

    if (isRoleSet && isRoleFetching && isRoleFuncCalled) {
      this.setState({role: false});
      this.setRangeFilter();
    }

    const isApplicantListLoaded = applicants.length > 0;
    const isScoreAlreadySet = score.scores.length === 0;
    const isScoreFetching = !score.isFetching;
    const isScoreCalled = this.state.score;

    if (isApplicantListLoaded && isScoreAlreadySet && isScoreFetching && isScoreCalled) {
      this.setState({score: false});
      this.initilizeScores(applicants, filters);
    }
  }

  setRangeFilter() {
    const { role, applicantActions } = this.props;
    let range = {};

    if (role.range && role.range.included.length > 0) {
      range.range = role.range.range;
      range.zip = role.range.zipCode;
      range.rangeZips = role.range.included
    }
    let skills = [];
    if (role.skills && role.skills.length > 0) skills = role.skills
    applicantActions.fetchFilterSkills(skills);

    applicantActions.filterChange({
      school: role.degreeRequirements,
      skill: skills,
      address: range
    });
  }

  initilizeScores(applicants, filters) {
    const profIds = applicants.map( (p) => { return p._id});
    this.props.scoreActions.fetchScores(profIds, filters);
  }

  fetchScores(newSkills) {
    const { scoreActions, applicants, filters } = this.props
    const f = { ...filters, skill: newSkills.skill};
    const profIds = applicants.map( (p) => { return p._id});
    scoreActions.fetchScores(profIds, f);
  }

  clearFilters() {
    this.props.addressActions.clearRangeAddress()
    this.props.applicantActions.clearFilters()
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
    this.props.scoreActions.clearScores()
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

        <ApplicantFilterController
          fetchScores={this.fetchScores.bind(this)}
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
              <TableHeaderColumn>Score</TableHeaderColumn>
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
    roleFetching: state.role.isFetching,
    company: state.company.company,
    applicants: FilteredApplicantSelector(state),
    score: state.score,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    roleActions: bindActionCreators(roleActionCreator, dispatch),
    addressActions: bindActionCreators(addressActionCreator, dispatch),
    applicantActions: bindActionCreators(applicantActionCreator, dispatch),
    scoreActions: bindActionCreators(scoreActionCreator, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantList);