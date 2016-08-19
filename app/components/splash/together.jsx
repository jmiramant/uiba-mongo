import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/splash/together';

const cx = classNames.bind(styles);

export default class SplashTogether extends React.Component {

  render() {
    return (
      <span>
        <h1 className={cx('spalsh--section-title', 'together--title')}>Let’s Succeed, Together <hr className={cx('section--title-underline')}/> </h1>
        <div className={cx('together--left') + ' col-md-8'}>
          <p className={cx('together--sub-text')}>Our goal is to make your dreams as reachable as possible by bringing the entire world and all its opportunities to you, then building the paths to make those opportunities a reality.</p>
          <p className={cx('together--sub-text')}>Our pledge is to travel those paths with you, to always be there for you, from wherever you start to wherever you finish, because everyone should have a companion on the most important journey of their life.</p>
        </div>
        <div className={cx('together--right') + ' col-md-4'}>
          <div className={cx('together-icon')}></div>
        </div>
      </span>
    )
  }
  

};