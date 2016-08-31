import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/userCard';
import moment from 'moment';

const cx = classNames.bind(styles);

export default class UserCard extends React.Component {
  
  //static propTypes = {
  // profile: PropTypes.object,
  //}
  
  render () {
    const { profile } = this.props;
    return (
      <div className={cx('userCard--container') + ' text-center'}>      
        <div className={cx('userCard--picture-container')}>
          <img className={cx('userCard--picture-img')} src={profile.picture}/>
        </div>
        <div className={cx('userCard--name')}>{profile.name}</div>
        <div>{profile.headline}</div>
      </div>
    )
  }
};