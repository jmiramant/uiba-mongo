import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/splash';

import { mixpanelURLTrack } from 'middlewares/mixpanelTrackers';

import Hero from 'components/splash/hero';
import Succeed from 'components/splash/succeed';
import Works from 'components/splash/works';
import Companies from 'components/splash/companies';
import Numbers from 'components/splash/numbers';
import Together from 'components/splash/together';

const cx = classNames.bind(styles);

class Splash extends Component {

  componentDidMount() {
    mixpanelURLTrack('INDEX[load]:init');
  }

  render() {

    return (
      <div className={cx('splash-container')}>
        
        <section className={cx('section--darkBlue', 'section--hero')}> 
          <Hero/>
        </section>

        <section className={cx('section--white', 'section--no-padding') + ' animated fadeInSlow'}>
          <Succeed/>
        </section>

        <section className={cx('section--tan', 'section--works')}>
          <Works/>
        </section>

        <section className={cx('section--darkBlue', 'section--companies')}>
          <Companies/>
        </section>

        <section className={cx('section--white', 'section--numbers')}>
          <Numbers/>
        </section>
        
        <section className={cx('section--tan', 'section--together')}>
          <Together/>
        </section>
      
      </div>
    );
  
  }
};

export default Splash;
