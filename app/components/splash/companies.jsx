import React from 'react';
import ReactDom from 'react-dom';
import Waypoint from 'react-waypoint';
import classNames from 'classnames/bind';
import styles from 'css/components/splash/companies';

const cx = classNames.bind(styles);

export default class SplashCompanies extends React.Component {

  componentDidMount() {
    var elem = ReactDom.findDOMNode(this);
    elem.style.opacity = 0;
  }

  handleWaypointEnter() {
    var elem = ReactDom.findDOMNode(this);
    window.requestAnimationFrame(function() {
      elem.style.transition = "opacity 800ms";
      elem.style.opacity = 1;
    });
  }

  render() {
    return (
      <div>
        <h1 className={cx('spalsh--section-title')}>Companies and Organizations  <hr className={cx('section--title-underline', 'section--title-underline-dark') + ' hidden-xs'}/> </h1>
        <p className={cx('companies--sub-text')}>“In the 21st-century organization, employees own most of the assets because they are most of the assets.” <br/><br/> Uiba uses math, data science, and machine learning to forge this wisdom into a virtuous circle for our clients by:</p>

        <Waypoint onEnter={this.handleWaypointEnter.bind(this)}/>

        <div className={cx('companies--box')}>
          <div className='col-md-4 col-sm-24'>
            <div className={cx('companies--box-item', 'companies--box-item-red')}>
              <div className={cx('companies--box-title', 'first')}>Comparative Talent Assessment</div>
              <div className={cx('companies--item-icon', 'balance')}></div>
              <div className={cx('companies--box-text')}>Understand your organization’s capabilities by role, by team, and versus the market.</div>
            </div>
          </div>
          <div className='col-md-4 col-sm-24'>
            <div className={cx('companies--box-item', 'companies--box-item-yellow')}>
              <div className={cx('companies--box-title')}>Workforce Optimization</div>
              <div className={cx('companies--item-icon', 'flowchart')}></div>
              <div className={cx('companies--box-text')}>Identify latent, under-utilized, or mismatched talent with recommendations for more productive application.</div>
            </div>
          </div>
          <div className='col-md-4 col-sm-24'>
            <div className={cx('companies--box-item', 'companies--box-item-blue')}>
              <div className={cx('companies--box-title')}>Global Talent Mobility</div>
              <div className={cx('companies--item-icon', 'cog')}></div>
              <div className={cx('companies--box-text')}>Tailored career guidance empowers employees to understand & manage their careers.</div>
            </div>
          </div>
          <div className='col-md-4 col-md-offset-2'>
            <div className={cx('companies--box-item', 'companies--box-item-blue')}>
              <div className={cx('companies--box-title', 'bottom')}>Talent Acquisition</div>
              <div className={cx('companies--item-icon', 'crosshair')}></div>
              <div className={cx('companies--box-text')}>Predictive hiring identifies the best talent for any role.</div>
            </div>
          </div>
          <div className='col-md-4 col-sm-24'>
            <div className={cx('companies--box-item', 'companies--box-item-red')}>
              <div className={cx('companies--box-title', 'bottom')}>Talent Retention</div>
              <div className={cx('companies--item-icon', 'caution')}></div>
              <div className={cx('companies--box-text')}>Predictive identification of at-risk employees drives early intervention.</div>
            </div>
          </div>
        </div>
        <h4 className={cx('companies-contact') + " col-md-12"}><a href='mailto:info@uiba.co'>Contact us</a> today to find out how to drive your organization’s productivity to peak performance.</h4>
      </div>
    )
  }
  

};