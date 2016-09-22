import React from 'react';
import ReactDom from 'react-dom';
import Waypoint from 'react-waypoint';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/splash/hero';
import Rocket from 'components/Rocket';

const cx = classNames.bind(styles);

export default class SplashHero extends React.Component {

  componentDidMount() {
    var elem = ReactDom.findDOMNode(this);
    elem.style.opacity = 0;
  }

  handleWaypointEnter() {
    var elem = ReactDom.findDOMNode(this);
    window.requestAnimationFrame(function() {
      elem.style.transition = "opacity 1500ms";
      elem.style.opacity = 1;
    });
  }

  render() {
    return (
      <div>
        <Waypoint onEnter={this.handleWaypointEnter.bind(this)}/>
        <div className={cx('hero--left') + ' col-md-6'}>
          <h1 className={cx('hero--title') + ' animated fadeInLeft'}>Launch your<br/>Career Path</h1>
          <p className={cx('hero--sub-title')+ ' animated fadeInLeft'}>Understand your Capabilities.<br/>Start building your future today.</p>
          <Link to="/about" className={cx('button')+ ' animated fadeInLeft'}>About Us</Link>
        </div>
        <div className={cx('hero--right') + ' col-md-6 animated fadeInRight'}>
          <Rocket />
        </div>
      </div>
    )
  }
  

};