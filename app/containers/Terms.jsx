import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/terms';

const cx = classNames.bind(styles);

const Terms = () => {
  return (
    <div className={cx('terms')}>
      <h1 className={cx('header')}>Terms Uiba</h1>
      <div className={cx('description')}>
        <p>Here's all of our lega.</p>
      </div>
    </div>
  );
};

export default Terms;
