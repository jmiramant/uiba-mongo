import React from 'react';
import ReactDom from 'react-dom';
import Waypoint from 'react-waypoint';
import classNames from 'classnames/bind';
import styles from 'css/components/splash/together';

const cx = classNames.bind(styles);

export default class SplashTogether extends React.Component {
  
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
        <h1 className={cx('spalsh--section-title')}>Let’s Succeed, Together <hr className={cx('section--title-underline')}/> </h1>
        <div className={cx('together--left') + ' col-md-8'}>
          <p className={cx('together--sub-text')}><span className={cx('together--highlight')}>Our goal</span> is to make your dreams as reachable as possible by bringing the entire world and all its opportunities to you, then building the paths to make those opportunities a reality.</p>
          <p className={cx('together--sub-text')}><span className={cx('together--highlight')}>Our pledge</span> is to travel those paths with you, to always be there for you, from wherever you start to wherever you finish, because everyone should have a companion on the most important journey of their life.</p>
        </div>
        <div className={cx('together--right') + ' col-md-4'}>
          <div className={cx('together-icon') + ' hidden-xs'}></div>
        </div>
      </div>
    )
  }
  

};