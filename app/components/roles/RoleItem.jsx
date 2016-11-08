import React, { PropTypes } from 'react';

import RoleAdd from 'components/roles/RoleAdd';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/role';
const cx = classNames.bind(styles);

export default class RoleItem extends React.Component {
  
  static propTypes = {
    role: PropTypes.object.isRequired, 
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
          } = this.props;
    
    return (
      <TableRow>
        <TableRowColumn>{role.title}</TableRowColumn>
        <TableRowColumn>{moment(new Date(role.createdAt)).format('MMM DD, YYYY')}</TableRowColumn>
        <TableRowColumn>{role.appliedCount}</TableRowColumn>
        <TableRowColumn>{'www.alsk.com'}</TableRowColumn>
        <TableRowColumn><FlatButton label="Delete" primary={true} /></TableRowColumn>
      </TableRow>
    )

  }
};

            
