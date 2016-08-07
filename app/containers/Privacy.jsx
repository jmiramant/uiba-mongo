import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/privacy';

const cx = classNames.bind(styles);

const Privacy = () => {
  return (
    <div className={cx('legal')}>
      <h1 className={cx('header')}>Privacy</h1>
      <div className={cx('description')}>
        <p>Here are all of our Privacy policy.</p>
      </div>
    </div>
  );
};

export default Privacy;
