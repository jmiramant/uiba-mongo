import React, { PropTypes } from 'react';

import Chip from 'material-ui/Chip';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/interest';
const cx = classNames.bind(styles);

export default class InterestItem extends React.Component {
  
  static propTypes = {
    interest: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render () {
    const { 
      interest, 
    } = this.props;

    return (
      <div className={cx('chip-container')}>
        <Chip className={cx('interestItem--chip')}>
          {interest.interest} 
        </Chip>
      </div>
    )
  
  }
};