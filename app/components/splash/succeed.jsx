import React from 'react';
import ReactDom from 'react-dom';
import classNames from 'classnames/bind';
import Carousel , { Item as CItem, Caption as CCaption } from 'react-bootstrap/lib/Carousel';

import imgMicrophone from 'images/splash/Microphone.svg';
import imgGrid from 'images/splash/3D-Grid.svg';
import imgMap from 'images/splash/Map.svg';
import imgYing from 'images/splash/Yin-Yang.svg';

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
      <div>
        <h1 className={cx('spalsh--section-title') + ' col-md-12'}>Let's Find Your Path <hr className={cx('section--title-underline') + ' hidden-xs'}/> </h1>
        <Carousel indicators={false}>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border', 'carousel--img-border-yellow')}><img className={cx('spalsh--carousel-img')} width={125} height={125} alt="125X125" src={imgMicrophone}/></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>1. Let's Get to Know You</h3>
              <p className={cx('carousel--item-sub')}>First, let's make sure we understand your experience, knowledge, abilities - everything that makes you so unique and amazing!</p>
            </CCaption>
          </CItem>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border', 'carousel--img-border-red')}><img className={cx('spalsh--carousel-img')} width={125} height={125} alt="125X125" src={imgGrid} /></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>2. Let's Understand Your Capabilities</h3>
              <p className={cx('carousel--item-sub')}>Next, let's use that information to assess the full extent of your capabilities.</p>
            </CCaption>
          </CItem>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border', 'carousel--img-border-blue')}><img className={cx('spalsh--carousel-img')} width={125} height={125} alt="125X125" src={imgMap} /></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>3. Find Your Path</h3>
              <p className={cx('carousel--item-sub')}>Then let's see how your capabilities compare with the requirements of various roles along different career paths.</p>
            </CCaption>
          </CItem>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border', 'carousel--img-border-red')}><img className={cx('spalsh--carousel-img')} width={125} height={125} alt="125X125" src={imgYing} /></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>4. Let's Journey Together</h3>
              <p className={cx('carousel--item-sub')}>Now join a community that shares the wisdom and insight of experience to help you achieve your goals while helping others achieve theirs.</p>
            </CCaption>
          </CItem>
        </Carousel>
        <style>{carouselControlOverride}</style>
      </div>
    )
  }
  

};