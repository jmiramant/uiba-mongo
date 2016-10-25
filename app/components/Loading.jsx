import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/loading';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const cx = classNames.bind(styles);

export default class Loading extends React.Component {
  
  static PropTypes =  {
    componentName: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render () {

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className={cx('loading-text')}>
          <p>Loading {this.props.componentName}</p>
        </div>
      </MuiThemeProvider> 
    )

  
  }
};