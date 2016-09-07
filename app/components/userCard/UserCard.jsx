import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/userCard';
import moment from 'moment';
import DefaultUserIcon from 'material-ui/svg-icons/action/account-circle';

const cx = classNames.bind(styles);

export default class UserCard extends React.Component {
  
  //static propTypes = {
          // <a className={cx('button')}href="/auth/linkedin">AutoFill</a>
  // profile: PropTypes.object,
  //}
  
  render () {
    const { profile } = this.props;
    return (
      <div className={cx('userCard--container') + ' text-center'}>
        <div className={cx('profile--container')}>
          <div className={cx('userCard--picture-container')}>
            {profile.picture ? (
              <img className={cx('userCard--picture-img')} src={profile.picture}/>
            ) : (
              <DefaultUserIcon className={cx('userCard--default-icon')}/>            
            )}
          </div>
          <div className={cx('userCard--name')}>{profile.name}</div>
          <div>{profile.headline}</div>
        </div>
      </div>
    )
  }
};