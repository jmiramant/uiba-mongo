import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/splash';
import Rocket from 'components/Rocket';
import { Button } from 'react-bootstrap';

const cx = classNames.bind(styles);

const Splash = () => {
  return (
    <div className={cx('splash-container')}>
      
      <section className={cx('hero', 'section--darkBlue')}>
        <div className={cx('hero--left') + ' col-md-6'}>
          <h1 className={cx('hero--title')}>Launch<br/>your<br/>Career Path</h1>
          <p className={cx('hero--sub-title')}>Understand your Capabilities.<br/>Start building your future today.</p>
          <Button className={cx('button')}>Get Started</Button>
        </div>
        <div className={cx('hero--right') + ' col-md-6'}>
          <Rocket />
        </div>
      </section>

      <section className={"pure-g"}>
        <h1 className={cx('section--title' + ' pure-u-1')}>How You'll Succeed</h1>
        <div className='column-box'>
          <div className={cx('column-box--item' + ' pure-u-1-3 pure-u-md-1')}>
            <div className={cx('column-box--title')}>Introduce Yourself</div>
            <div className={cx('column-box--description')}>First, let's make sure we understand your expierence, knowledge, abilities - everything that makes you so unique and amazing!</div>
          </div>
          <div className={cx('column-box--item' + ' pure-u-1-3 pure-u-md-1')}>
            <div className={cx('column-box--title')}>Understand Yourself</div>
            <div className={cx('column-box--description')}>Next, let's use that information to access the full extent of your capabilities.</div>
          </div>
          <div className={cx('column-box--item' + ' pure-u-1-3 pure-u-md-1')}>
            <div className={cx('column-box--title')}>Find Your Path</div>
            <div className={cx('column-box--description')}>Then let's see how your capabilities compare with the requirements of various roles along differenct career paths.</div>
          </div>
        </div>
      </section>

      <section className={cx('section--tan')}>
        <h1 className={cx('section--title')}>How It Works</h1>
        <div className='column-box'>
          <div className={cx('column-box--item')}>
            <div className={cx('column-box--title')}>It starts with Data</div>
            <div className={cx('column-box--description')}>We gather almost a century's worth of global labor data from governments, universities, think tanks, private companies, and more.</div>
          </div>
          <div className={cx('column-box--item')}>
            <div className={cx('column-box--title')}>Then the Nature of Work</div>
            <div className={cx('column-box--description')}>Using that data, we applied data science and machine learning to deleve into the nature of how work is performed: knowledge, skills, activities, teamwork, etc.</div>
          </div>
          <div className={cx('column-box--item')}>
            <div className={cx('column-box--title')}>Find Your Path</div>
            <div className={cx('column-box--description')}>Once the model was proven accurate we built a platform for people to assess their capabilities and use that wisdom to create their career paths and achieve their goals.</div>
          </div>
        </div>
        <p className={cx('section--sub-text')}>What you see now is just the first phase of Uiba. We’re looking forward to our journey together.</p>
      </section>

      <section>
        <h1 className={cx('section--title')}>Companies and Orangization</h1>
        <p className={cx('section--sub-text')}>We help organizations around the world achieve peak productivity by providing the most accurate and informative workforce analytics available.</p>
        <p className={cx('section--sub-text')}>while increasing employee engagement by offering organizational career path planning and development recommendations to achieve career goals.</p>
        <div className='column-box'>
          <div className={cx('column-box--item')}>
            <div className={cx('column-box--title')}>Productivity Analytics</div>
          </div>
          <div className={cx('column-box--item')}>
            <div className={cx('column-box--title')}>Workforce Optimization</div>
          </div>
          <div className={cx('column-box--item')}>
            <div className={cx('column-box--title')}>Employee Development</div>
          </div>
        </div>
      </section>
      <section className={cx('section--tan')}>
        <h1 className={cx('section--title')}>LET’S SUCCEED, TOGETHER</h1>
        <p className={cx('section--sub-text')}>Our goal is to make your dreams as reachable as possible by bringing the entire world and all its opportunities to you, then building the paths to make those opportunities a reality.</p>
        <p className={cx('section--sub-text')}>Our pledge is to travel those paths with you, to always be there for you, from wherever you start to wherever you finish, because everyone should have a companion on the most important journey of their life.</p>
        <div className={cx('button')}>Let's Get Started</div>
      </section>
    </div>
  );
};

export default Splash;
