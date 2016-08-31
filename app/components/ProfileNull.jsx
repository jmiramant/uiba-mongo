import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/null';

const cx = classNames.bind(styles);

export default class ProfileNull extends React.Component {
  
  static propTypes = {
    target: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render () {
    const {
            target, 
          } = this.props;
    return (
      <div className={cx('profileNull--container')}>
        <h4 className={cx('profileNull--text')}>You have no {target}s loaded.</h4>
      </div>
    )

  
  }
};