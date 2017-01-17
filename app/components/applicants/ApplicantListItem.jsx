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

    return (
      <TableRow>
        <TableRowColumn>{applicant.firstName}</TableRowColumn>
        <TableRowColumn>{applicant.lastName}</TableRowColumn>
        <TableRowColumn>{moment(new Date(applicant.updatedAt)).format('MMM DD, YYYY')}</TableRowColumn>
        <TableRowColumn><ScoreChip score={score} isFetching={isScoreFetching} /></TableRowColumn>
        <TableRowColumn>
          <Link to={'/company-admin/role/' + role._id + '/applicant/' + applicant._id }>
            <FlatButton label="View Applicant" primary={true} />
          </Link>
        </TableRowColumn>
      </TableRow>
    )

  }
};

            
