import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';

const cx = classNames.bind(styles);

const Splash = () => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('header')}>This is a pretty splash page</h1>
    </div>
  );
};

export default Splash;
