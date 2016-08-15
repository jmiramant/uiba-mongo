import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';
import _ from 'lodash';
import { StickyContainer, Sticky } from 'react-sticky';
import { Grid, Col } from 'react-bootstrap';

const cx = classNames.bind(styles);

let date = [
  'Around 15000 BCE hunter-gathers roam the world.',
  'Around 14999 BCE the first career decision is made without data.',
  'Around 10000 BCE Agriculture is invented.',
  'Around 3000 BCE the first king shows up.',
  'Around 500 BCE the division of labor happens.',
  'Around 499 BC the first instance of career anxiety occurs.',
  'Around 1700 the industrial revolution happens.',
  'Around 1701 the first skills shortage occurs.',
  'Around 1946 the first computer is built.',
  'Around 1946 the first bug is found.',
  'Around 2015 two friends get together and build the world’s finest machine learning platform for career planning.',
  'Around 2016 the first company uses Uiba to increase productivity.',
  'Around 2016 the first person uses Uiba to build a career map and take control of their future.',
  '2017 and beyond'
]

let statement = [
  "Woo Hoo! I’m the first entrepreneur!",
  "Pfft I’ve had it with gathering! Hunting is where it’s at!",
  "Woo hoo! Bread!",
  "Thanks for the bread!",
  "OMFG! Career choices!",
  "So many choices, what’s my path?!",
  "I need to hire workers!",
  "What do you mean I have to pay them?!",
  "I, for one, welcome our new computer overlords.",
  "I, for one, welcome our new insect overlords.",
  "Suck it, career anxiety!",
  "Hey you did it! This is amazing! So listen, we have this bug…",
  "I want to be a hunter-gatherer!",
  "Bread for everyone!"
]

let timeline = date.map( (title, i) => {
    return (
      <StickyContainer key={1111 + i} style={{zIndex: 2}}>
        <Sticky>
          <h3>{title}</h3>
        </Sticky>
        <p>{statement[i]}</p>
      </StickyContainer>
    )
  }
)

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
