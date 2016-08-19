import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/splash/works';

const cx = classNames.bind(styles);

export default class SplashHero extends React.Component {

  render() {
    return (
      <span>
        <h1 className={cx('section--title', 'spalsh--section-title')}>How It Works <hr className={cx('section--title-underline')} /></h1>
        <div className={cx('works--column-container')}>
          <div className={cx('works--item-container')}>
            <div className={cx('works--icon-container')}>
              <div className={cx('works--border')}>
                <div className={cx('works--icon-coding')}></div>
              </div>
            </div>
            <div className={cx('works--text-container')}>
              <div className={cx('works--title')}>It starts with Data</div>
              <div className={cx('works--description')}>We gathered almost a century's worth of global labor data from governments, universities, think tanks, private companies, and more.</div>
            </div>
          </div>
          <div className={cx('works--item-container')}>
            <div className={cx('works--icon-container')}>
              <div className={cx('works--border')}>
                <div className={cx('works--icon-scientist')}></div>
              </div>
            </div>
            <div className={cx('works--text-container')}>
              <div className={cx('works--title')}>Then the Nature of Work</div>
              <div className={cx('works--description')}>Using that data, we applied data science and machine learning to deleve into the nature of how work is performed: knowledge, skills, activities, teamwork, etc.</div>
            </div>
          </div>
          <div className={cx('works--item-container')}>
            <div className={cx('works--icon-container')}>
              <div className={cx('works--border')}>
                <div className={cx('works--icon-globe')}></div>
              </div>
            </div>
            <div className={cx('works--text-container')}>
              <div className={cx('works--title')}>Find Your Path</div>
              <div className={cx('works--description')}>Once the model was proven accurate we built a platform for people to assess their capabilities and use that wisdom to create their career paths and achieve their goals.</div>
            </div>
          </div>
        </div>
        <p className={cx('works--sub-text')}>What you see now is just the first phase of Uiba. We’re looking forward to our journey together.</p>
      </span>
    )
  }
  

};