import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/splash/numbers';

const cx = classNames.bind(styles);

export default class SplashNumbers extends React.Component {

  render() {
    return (
      <span>
        <h1 className={cx('spalsh--section-title', 'together--title')}>The Numbers Tell the Story <hr className={cx('section--title-underline')}/> </h1>
        
        <div className={cx('numbers--item') + " col-md-offset-2 col-md-8"}>
          <div className={cx('numbers--left')}>
            <div className={cx('numbers--icon-bg')}>
              <div className={cx('numbers--icon-first')}></div>
            </div>
          </div>
          <div className={cx('numbers--right')}>
            <h3 className={cx('numbers--num-title')}>1%</h3>
            <div>At one client, 1% was the norm: 100 interview candidates were rejected for each person hired.</div>
            <div>Uiba’s result: 100% - 10 candidates recommended, 10 offers to hire.</div>
          </div>
        </div>
        
        <div className={cx('numbers--item') + " col-md-offset-2 col-md-8"}>
          <div className={cx('numbers--left')}>
            <h3 className={cx('numbers--num-title')}>40,000</h3>
            <div>At another client, 40,000 applications were received for a single position. Over 99% weren’t reviewed. No one was deemed qualified.</div>
            <div>Uiba’s result: all 40,000 reviewed, dozens of ideal candidates identified, 5 recommended, 1 hired.</div>
          </div>
          <div className={cx('numbers--right')}>
            <div className={cx('numbers--icon-bg')}>
              <div className={cx('numbers--icon-second')}></div>
            </div>
          </div>
        </div>
        
        <div className={cx('numbers--item') + " col-md-offset-2 col-md-8"}>
          <div className={cx('numbers--left')}>
            <div className={cx('numbers--icon-bg')}>
              <div className={cx('numbers--icon-third')}></div>
            </div>
          </div>
          <div className={cx('numbers--right')}>
            <h3 className={cx('numbers--num-title')}>50%</h3>
            <div>With most clients, 50% reduction in turnover resulting in millions of dollars saved.</div>
          </div>
        </div>

        <div className={cx('numbers--item') + " col-md-offset-2 col-md-8"}>
          <div className={cx('numbers--left')}>
            <h3 className={cx('numbers--num-title')}>30%</h3>
            <div>With most clients, 30% productivity gains resulting in millions of dollars earned.</div>
          </div>
          <div className={cx('numbers--right')}>
              <div className={cx('numbers--icon-bg')}>
              <div className={cx('numbers--icon-forth')}></div>
            </div>          
          </div>
        </div>

      </span>
    )
  }
  
};