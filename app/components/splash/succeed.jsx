import React from 'react';
import ReactDom from 'react-dom';
import classNames from 'classnames/bind';
import Carousel , { Item as CItem, Caption as CCaption } from 'react-bootstrap/lib/Carousel';

import imgMicrophone from 'images/splash/Microphone.svg';
import imgGrid from 'images/splash/3D-Grid.svg';
import imgMap from 'images/splash/Map.svg';
import imgYing from 'images/splash/Yin-Yang.svg';
import "lib/caroselOverrides.less";

import styles from 'css/components/splash/succeed';
const cx = classNames.bind(styles);

export default class SplashSucceed extends React.Component {
  render() {
    return (
      <div>
        <h1 className={cx('spalsh--section-title') + ' col-md-12'}>FIND YOUR PATH <hr className={cx('section--title-underline') + ' hidden-xs'}/> </h1>
        <Carousel indicators={false}>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border', 'carousel--img-border-yellow')}><img className={cx('spalsh--carousel-img')} width={109} height={109} alt="109X109" src={imgMicrophone}/></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>1. Getting to Know You</h3>
              <p className={cx('carousel--item-sub')}>First, let's make sure we understand your experience, knowledge, abilities - everything that makes you so unique and amazing!</p>
            </CCaption>
          </CItem>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border', 'carousel--img-border-red')}><img className={cx('spalsh--carousel-img')} width={109} height={109} alt="109X109" src={imgGrid} /></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>2. Understanding Your Capabilities</h3>
              <p className={cx('carousel--item-sub')}>Now let's compare your capabilities with the requirements of various roles along different career paths to being building your future today.</p>
            </CCaption>
          </CItem>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border', 'carousel--img-border-blue')}><img className={cx('spalsh--carousel-img')} width={109} height={109} alt="109X109" src={imgMap} /></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>3. Finding Your Path</h3>
              <p className={cx('carousel--item-sub')}>Then let's see how your capabilities compare with the requirements of various roles along different career paths.</p>
            </CCaption>
          </CItem>
        </Carousel>
      </div>
    )
  }
  

};