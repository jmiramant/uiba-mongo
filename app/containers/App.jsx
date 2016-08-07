import React, { PropTypes } from 'react';
import Navigation from 'containers/Navigation';
import Message from 'containers/Message';
import Footer from 'containers/Footer';
import classNames from 'classnames/bind';
import styles from 'css/main';

const cx = classNames.bind(styles);

const App = ({children}) => {
  return (
    <div>
      <Navigation />
      <div className={cx('app')}>
        <Message />
          {children}
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
