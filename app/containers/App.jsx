import React, { PropTypes } from 'react';
import Navigation from 'containers/Navigation';
import Footer from 'containers/Footer';
import classNames from 'classnames/bind';
import styles from 'css/main';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const cx = classNames.bind(styles);

const App = ({children}) => {
  return (
    <div>
      <Navigation />
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className={cx('app')}>
            {children}
        </div>
      </MuiThemeProvider>
      <Footer />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
