import React from 'react';
import classNames from 'classnames/bind';
import Carousel , { Item as CItem, Caption as CCaption } from 'react-bootstrap/lib/Carousel';

import imgDialed from 'images/splash/Settings-2.svg';
import imgRadar from 'images/splash/Radar.svg';
import imgMap from 'images/splash/Map.svg';

import styles from 'css/components/splash/succeed';
const cx = classNames.bind(styles);
const carouselControlOverride = "\
  .carousel-control.left,.carousel-control.right{\
    background-image:none !important;\
    opacity: 1;\
    text-shadow: none;\
  }\
  .carousel-control .glyphicon {\
    color: #f20253;\
  }\
"

export default class SplashSucceed extends React.Component {

  render() {
    return (
      <span>
        <h1 className={cx('spalsh--section-title') + ' col-md-12'}>How You'll Succeed <hr className={cx('section--title-underline')}/> </h1>
        <Carousel indicators={false}>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border', 'carousel--img-border-yellow')}><img className={cx('spalsh--carousel-img')} width={125} height={125} alt="125X125" src={imgDialed}/></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>1. Introduce Yourself</h3>
              <p className={cx('carousel--item-sub')}>First, let's make sure we understand your expierence, knowledge, abilities - everything that makes you so unique and amazing!</p>
            </CCaption>
          </CItem>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border', 'carousel--img-border-red')}><img className={cx('spalsh--carousel-img')} width={125} height={125} alt="125X125" src={imgRadar} /></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>2. Understand Yourself</h3>
              <p className={cx('carousel--item-sub')}>Next, let's use that information to access the full extent of your capabilities.</p>
            </CCaption>
          </CItem>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border', 'carousel--img-border-blue')}><img className={cx('spalsh--carousel-img')} width={125} height={125} alt="125X125" src={imgMap} /></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>3. Find Your Path</h3>
              <p className={cx('carousel--item-sub')}>Then let's see how your capabilities compare with the requirements of various roles along differenct career paths.</p>
            </CCaption>
          </CItem>
        </Carousel>
        <style>{carouselControlOverride}</style>
      </span>
    )
  }
  

};