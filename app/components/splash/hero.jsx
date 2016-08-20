import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/splash/hero';
import Rocket from 'components/Rocket';

const cx = classNames.bind(styles);

export default class SplashHero extends React.Component {

  render() {
    return (
      <span>
        <div className={cx('hero--left') + ' col-md-6'}>
          <h1 className={cx('hero--title') + ' animated fadeInLeft'}>Launch your<br/>Career Path</h1>
          <p className={cx('hero--sub-title')+ ' animated fadeInLeft'}>Understand your Capabilities.<br/>Start building your future today.</p>
          <Link to="/login" className={cx('button')+ ' animated fadeInLeft'}>Get Started</Link>
        </div>
        <div className={cx('hero--right') + ' col-md-6 animated fadeInRight'}>
          <Rocket />
        </div>
      </span>
    )
  }
  

};