import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/splash';
import Rocket from 'components/Rocket';
import { Link } from 'react-router';
import imgDialed from '../images/splash/dialed.svg';
import imgRadar from '../images/splash/Radar.svg';
import imgMap from '../images/splash/Map.svg';
import Carousel , { Item as CItem, Caption as CCaption }from 'react-bootstrap/lib/Carousel';

const cx = classNames.bind(styles);

const carouselControlOverride = "\
    .carousel-control.left,.carousel-control.right{\
      background-image:none !important;\
      opacity: 1;\
      text-shadow: none;\
    }\
    .carousel-control .glyphicon {\
      color: rgba(242, 2, 83, 0.7);\
    }\
  "

const Splash = () => {

  return (
    <div className={cx('splash-container')}>
      <section className={cx('hero', 'section--darkBlue')}>
        <div className={cx('hero--left') + ' col-md-6'}>
          <h1 className={cx('hero--title')}>Launch your<br/>Career Path</h1>
          <p className={cx('hero--sub-title')}>Understand your Capabilities.<br/>Start building your future today.</p>
          <Link to="/login" className={cx('button')}>Get Started</Link>
        </div>
        <div className={cx('hero--right') + ' col-md-6'}>
          <Rocket />
        </div>
      </section>

      <section className={cx('section--no-padding')}>
        <h1 className={cx('spalsh--section-title') + ' col-md-12'}>How You'll Succeed <hr className={cx('section--title-underline')}/> </h1>
        <Carousel indicators={false}>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border')}><img className={cx('spalsh--carousel-img')} width={125} height={125} alt="125X125" src={imgDialed}/></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>1. Introduce Yourself</h3>
              <p className={cx('carousel--item-sub')}>First, let's make sure we understand your expierence, knowledge, abilities - everything that makes you so unique and amazing!</p>
            </CCaption>
          </CItem>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border')}><img className={cx('spalsh--carousel-img')} width={125} height={125} alt="125X125" src={imgRadar} /></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>2. Understand Yourself</h3>
              <p className={cx('carousel--item-sub')}>Next, let's use that information to access the full extent of your capabilities.</p>
            </CCaption>
          </CItem>
          <CItem className={cx('carousel--item')}>
            <div className={cx('carousel--img-border')}><img className={cx('spalsh--carousel-img')} width={125} height={125} alt="125X125" src={imgMap} /></div>
            <CCaption className={cx('carousel--caption')}>
              <h3 className={cx('carousel--item-title')}>3. Find Your Path</h3>
              <p className={cx('carousel--item-sub')}>Then let's see how your capabilities compare with the requirements of various roles along differenct career paths.</p>
            </CCaption>
          </CItem>
        </Carousel>
        <style>{carouselControlOverride}</style>

      </section>

      <section className={cx('section--tan', 'section--works')}>
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
      </section>

      <section className={cx('section--companies')}>
        <h1 className={cx('spalsh--section-title')}>Companies and Organizations  <hr className={cx('section--title-underline', 'section--title-underline-dark')}/> </h1>
        <p className={cx('companies--sub-text')}>In the 21st-century organization, employees own most of the assets because they are most of the assets. Uiba uses math, data science, and machine learning to forge this wisdom into a virtuous circle for our clients by:</p>
        
        <div className={cx('companies--box')}>
          <div className='col-md-4'>
            <div className={cx('companies--box-item', 'companies--box-item-red')}>
              <div className={cx('companies--box-title')}>Precision Hiring</div>
              <div className={cx('companies--item-icon-computer')}></div>
              <div className={cx('companies--box-text')}>Uiba’s platform learns all aspects of any role while absorbing each team’s needs and the organization’s unique character to identify the ideal people for hiring, compressing the hiring cycle, and achieving full productivity sooner.</div>

            </div>
          </div>
          <div className='col-md-4'>
            <div className={cx('companies--box-item', 'companies--box-item-yellow')}>
              <div className={cx('companies--box-title')}>Workforce Optimization</div>
              <div className={cx('companies--item-icon-flowchart')}></div>
              <div className={cx('companies--box-text')}>Uiba’s prescriptive analysis uses event-driven activity and achieved results to identify future investment requirements by understanding the business drivers and making predictive improvements to those investments.</div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className={cx('companies--box-item', 'companies--box-item-blue')}>
              <div className={cx('companies--box-title')}>Career Guidance</div>
              <div className={cx('companies--item-icon-cog')}></div>
              <div className={cx('companies--box-text')}>Uiba’s ability to understand the roles, teams, and organization empower your employees to manage their careers and develop their capabilities thus raising engagement, retention, and productivity.</div>
            </div>
          </div>

        </div>
        <h4 className={cx('companies-contact')}>Contact us today to find out how to drive your organization’s productivity to peak performance.</h4>

      </section>
      <section className={cx('section--tan', 'section--together')}>
        <h1 className={cx('spalsh--section-title', 'together--title')}>Let’s Succeed, Together <hr className={cx('section--title-underline')}/> </h1>
        <div className={cx('together--left') + ' col-md-8'}>
          <p className={cx('together--sub-text')}>Our goal is to make your dreams as reachable as possible by bringing the entire world and all its opportunities to you, then building the paths to make those opportunities a reality.</p>
          <p className={cx('together--sub-text')}>Our pledge is to travel those paths with you, to always be there for you, from wherever you start to wherever you finish, because everyone should have a companion on the most important journey of their life.</p>
        </div>
        <div className={cx('together--right') + ' col-md-4'}>
          <div className={cx('together-icon')}></div>
        </div>
      </section>
    </div>
  );
};

export default Splash;
