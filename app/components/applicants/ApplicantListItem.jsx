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
    applicant: PropTypes.object.isRequired, 
    company: PropTypes.object.isRequired,
    score: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  state = {
    validationErrors: {},
  }

  render () {
    const { 
      score,
      company,
      applicant,
      handleArchive
    } = this.props;

    return (
      <TableRow>
        <TableRowColumn>{applicant.firstName}</TableRowColumn>
        <TableRowColumn>{applicant.lastName}</TableRowColumn>
        <TableRowColumn>{moment(new Date(applicant.updatedAt)).format('MMM DD, YYYY')}</TableRowColumn>
        <TableRowColumn><ScoreChip score={score} /></TableRowColumn>
        <TableRowColumn>
          <Link to={'/company-admin/applicant/' + applicant._id }>
            <FlatButton label="View Applicant" primary={true} />
          </Link>
        </TableRowColumn>
      </TableRow>
    )

  }
};

            
