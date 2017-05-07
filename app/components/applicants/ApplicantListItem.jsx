import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import ScoreChip from 'components/ScorerChip';
import FlatButton from 'material-ui/FlatButton';
import MessageIcon from 'material-ui/svg-icons/communication/message';
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

    const setRoleUrl = (role, applicant) => {
      let respUrl = '/company-admin';
      if (role && role._id) {
        respUrl += '/role/' + role._id;
      }
      respUrl += '/applicant/' + applicant._id;
      return respUrl;
    };

    return (
      <TableRow>
        <TableRowColumn>{applicant.firstName}</TableRowColumn>
        <TableRowColumn>{applicant.lastName}</TableRowColumn>
        <TableRowColumn>{moment(new Date(applicant.updatedAt)).format('MMM DD, YYYY')}</TableRowColumn>
        <TableRowColumn><ScoreChip score={score} isFetching={isScoreFetching} /></TableRowColumn>
        <TableRowColumn><a href={`mailto:${applicant.email}`} target='_blank'><MessageIcon className="email-applicant"/></a></TableRowColumn>
        <TableRowColumn>
          <Link to={setRoleUrl(role, applicant)}>
            <FlatButton label="View Applicant" primary={true} />
          </Link>
        </TableRowColumn>
      </TableRow>
    )

  }
};
