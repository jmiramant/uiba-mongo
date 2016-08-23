import React from 'react';
import ReactDom from 'react-dom';
import Waypoint from 'react-waypoint';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/splash/works';

const cx = classNames.bind(styles);

export default class SplashWorks extends React.Component {
  
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
        <h1 className={cx('section--title', 'spalsh--section-title')}>How It Works <hr className={cx('section--title-underline') + " hidden-xs"} /></h1>
        <div className={cx('works--column-container')}>
          <div className={cx('works--item-container')}>
            
            <div className={cx('works--icon-container') + ' col-md-3 hidden-sm hidden-xs'}>
              <div className={cx('works--border', 'red')}>
                <div className={cx('works--icon-coding')}></div>
              </div>
            </div>
            <div className={cx('works--text-container') + ' col-md-9'}>
              <div className={cx('works--title')}>It Starts with Data</div>
              <div className={cx('works--description')}>We’ve gathered almost a century's worth of global labor data from governments, universities, think tanks, private companies, and more.</div>
            </div>
          </div>
          
          <div className={cx('works--item-container')}>
            <div className={cx('works--icon-container') + ' col-md-3 hidden-sm hidden-xs'}>
              <div className={cx('works--border', 'yellow')}>
                <div className={cx('works--icon-scientist')}></div>
              </div>
            </div>
            <div className={cx('works--text-container') + ' col-md-9'}>
              <div className={cx('works--title')}>Then a Lot of Data Science</div>
              <div className={cx('works--description')}>Using that data, we applied data science and machine learning to deleve into the nature of how work is performed: knowledge, skills, activities, teamwork, etc.</div>
            </div>
          </div>
          
          <Waypoint onEnter={this.handleWaypointEnter.bind(this)}/>
          
          <div className={cx('works--item-container')}>
            <div className={cx('works--icon-container') + ' col-md-3 hidden-sm hidden-xs'}>
              <div className={cx('works--border', 'blue')}>
                <div className={cx('works--icon-dna')}></div>
              </div>
            </div>
            <div className={cx('works--text-container') + ' col-md-9'}>
              <div className={cx('works--title')}>To Achieve a Breakthrough</div>
              <div className={cx('works--description')}>The Uiba platform is capable of understanding the very nature of work itself in any role from dishwasher to physicist, intern to CEO.</div>
            </div>
          </div>

          <div className={cx('works--item-container')}>
            <div className={cx('works--icon-container') + ' col-md-3 hidden-sm hidden-xs'}>
              <div className={cx('works--border', 'red')}>
                <div className={cx('works--icon-jigsaw')}></div>
              </div>
            </div>
            <div className={cx('works--text-container') + ' col-md-9'}>
              <div className={cx('works--title')}>That Benefits All of Us, Together</div>
              <div className={cx('works--description')}>Once the platform learns your capabilities, regardless of background or experience, Uiba applies its model to help you achieve any career goal and connect you with fellow travelers.</div>
            </div>
          </div>
        </div>

        <p className={cx('works--sub-text')}>What you see now is just the first phase of Uiba. We’re looking forward to our journey together.</p>
      </div>
    )
  }
  

};