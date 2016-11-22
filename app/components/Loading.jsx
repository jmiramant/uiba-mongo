import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/loading';

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
      <div className={cx('loading-text')}>
        <p>Loading {this.props.componentName}</p>
      </div>
    )

  
  }
};