import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import ScoreChip from 'components/ScorerChip';
import FlatButton from 'material-ui/FlatButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/applicantList';
const cx = classNames.bind(styles);

export default class ApplicantListItem extends React.Component {

  static propTypes = {
    role: PropTypes.object.isRequired,
    score: PropTypes.string,
    company: PropTypes.object.isRequired,
    applicant: PropTypes.object.isRequired,
    isScoreFetching: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  state = {
    validationErrors: {},
  }

  render () {

    const {
      role,
      score,
      company,
      applicant,
      handleArchive,
      isScoreFetching,
    } = this.props;

    const setRoleUrl = (applicant) => {
      let respUrl = '/company-admin';
      if (applicant.role && applicant.role._id) {
        respUrl += '/role/' + applicant.role._id;
      }
      respUrl += '/applicant/' + applicant._id;
      return respUrl;
    };

    const roleTitle = (app) => {
      if (app.role) {
        return (<Link to={'/company-admin/applicants/' + app.role._id}>
          {app.role.title}
        </Link>);
      }
      return 'General Applicant';
    };

    return (
      <TableRow>
        <TableRowColumn>{applicant.firstName}</TableRowColumn>
        <TableRowColumn>{applicant.lastName}</TableRowColumn>
        <TableRowColumn>{moment(new Date(applicant.updatedAt)).format('MMM DD, YYYY')}</TableRowColumn>
        <TableRowColumn>{roleTitle(applicant)}</TableRowColumn>
        <TableRowColumn>
          <Link to={setRoleUrl(applicant)}>
            <FlatButton label="View Applicant" primary={true} />
          </Link>
        </TableRowColumn>
      </TableRow>
    )

  }
};
