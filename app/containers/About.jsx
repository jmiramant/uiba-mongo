import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';
import _ from 'lodash';
import { StickyContainer, Sticky } from 'react-sticky';
import { Grid, Col } from 'react-bootstrap';

const cx = classNames.bind(styles);

let timeline = [2000, 2010].map((decade) => {
  return (
    <StickyContainer key={decade} style={{zIndex: 4}}>
      <Sticky style={{zIndex: 3}}>
        <h2>{decade}s</h2>
      </Sticky>
      { _.range(0,10).map((i) => {
        return (
          <StickyContainer key={i} style={{zIndex: 2}}>
            <Sticky>
              <h3>{decade + i}</h3>
            </Sticky>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </StickyContainer>
        );
      })  }
    </StickyContainer>
  );
})

const About = () => {
  return (
    <div className={cx('about' + ' container')}>
      <StickyContainer>
        <Grid style={{marginTop: 40}}>
          <div className={cx('row-flex', 'row-flex-wrap')}>
            <Col xs={12} md={2} xsHidden smHidden className={cx('flex-col', 'timeline--column')} >
              <StickyContainer style={{height: '100%'}}>
                <Sticky>
                  <h3>About Uiba</h3>
                </Sticky>
              </StickyContainer>
            </Col>
            <Col xs={12} md={10} xsHidden className={cx('flex-col', 'timeline--column')}>
              { timeline }
            </Col>
          </div>
        </Grid>
      </StickyContainer>
    </div>
  );
};

export default About;
