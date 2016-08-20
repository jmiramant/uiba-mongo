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
      elem.style.transition = "opacity 1500ms";
      elem.style.opacity = 1;
    });
  }

  render() {
    return (
      <div>
        <h1 className={cx('spalsh--section-title')}>Companies and Organizations  <hr className={cx('section--title-underline', 'section--title-underline-dark')}/> </h1>
        <p className={cx('companies--sub-text')}>In the 21st-century organization, employees own most of the assets because they are most of the assets. Uiba uses math, data science, and machine learning to forge this wisdom into a virtuous circle for our clients by:</p>

        <Waypoint onEnter={this.handleWaypointEnter.bind(this)}/>

        <div className={cx('companies--box')}>
          <div className='col-md-4 col-sm-24'>
            <div className={cx('companies--box-item', 'companies--box-item-red')}>
              <div className={cx('companies--box-title')}>Precision Hiring</div>
              <div className={cx('companies--item-icon', 'computer')}></div>
              <div className={cx('companies--box-text')}>Uiba’s platform learns all aspects of any role while absorbing each team’s needs and the organization’s unique character to identify the ideal people for hiring, compressing the hiring cycle, and achieving full productivity sooner.</div>
            </div>
          </div>
          <div className='col-md-4 col-sm-24'>
            <div className={cx('companies--box-item', 'companies--box-item-yellow')}>
              <div className={cx('companies--box-title')}>Workforce Optimization</div>
              <div className={cx('companies--item-icon', 'flowchart')}></div>
              <div className={cx('companies--box-text')}>Uiba’s prescriptive analysis uses event-driven activity and achieved results to identify future investment requirements by understanding the business drivers and making predictive improvements to those investments.</div>
            </div>
          </div>
          <div className='col-md-4 col-sm-24'>
            <div className={cx('companies--box-item', 'companies--box-item-blue')}>
              <div className={cx('companies--box-title')}>Career Guidance</div>
              <div className={cx('companies--item-icon', 'cog')}></div>
              <div className={cx('companies--box-text')}>Uiba’s ability to understand the roles, teams, and organization empower your employees to manage their careers and develop their capabilities thus raising engagement, retention, and productivity.</div>
            </div>
          </div>

        </div>
        <h4 className={cx('companies-contact')}>Contact us today to find out how to drive your organization’s productivity to peak performance.</h4>
      </div>
    )
  }
  

};