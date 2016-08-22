import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';
import _ from 'lodash';

const cx = classNames.bind(styles);

const About = () => {
  return (
    <div className={cx('about')}>
      <div className={cx('container')}>
        <h2 className={cx('overide')}>Our Story</h2>
        <p>The idea of Uiba began by listening to those around us. </p>
        <p>Our friends and family, colleagues and acquaintances all struggled at times during their careers. For some it was trying to figure out what to do after graduation, for others it was realizing the career path they'd chosen wasn't right for them, for many it was simply wanting a new challenge or to do something more meaningful. </p>
        <p>Whatever the person's background or experience, the process was always fraught with anxiety and frustration. This was usually caused by a lack of knowledge about the opportunities available (The world is a big place, how do I find something that fits me?) and a lack of understanding of how to get from here to there (What's my path?). We were sympathetic because we had also experienced these same frustrations. </p>
        <p>So we sat down and started to think about this problem. And think. And think some more. Then we started talking to people in all walks of life from all over the planet (the internet is fantastic!) about this problem and how various people were dealing with it or trying to solve it.</p>
        <p>What we realized was it's a problem of information and it affects everyone: </p>
        <p>There's no one place I can go and learn about every possible career path and understand all the options, all the possibilities tailored specifically to me.</p>
        <p>There's no one place I can go and understand how qualified I am for a given career path and find recommendations about what I need to develop and learn to achieve my goals.</p>
        <p>There's no one place I can go to learn from the wisdom of other that have traveled career paths of interest to me or where I can share my own insights about my path with others.</p>
        <p>There's no one place I can go and figure out how I get from where I am today to where I want to be tomorrow.</p>
        <p>There's no one place I can go to do all of this. </p>
        <p>But there should be, so that's what we're building. </p>
        <p>We're building it because in this day and age there's no excuse for people suffering this much career anxiety and frustration or being trapped in jobs they dislike when there's so much each of us has to offer and contribute. So let's fix this for everyone.</p>
        <p>We invite you to join us because we'd like to make that journey with you, together.</p>
      </div>
    </div>
  );
};

export default About;
