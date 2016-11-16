import React, { PropTypes } from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import classNames from 'classnames/bind';
import styles from 'css/components/errorMessage';
const cx = classNames.bind(styles);

class Loader extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    const {
      target,
      percent
    } = this.props;

    return (
      <div>
      {target ? (
        <p>Fetching{" " + target}...</p>
      ) : (
        <p>Fetching...</p>
      )}
      { percent ?  (
        <CircularProgress
          mode="determinate"
          value={percent}
        />
      ) : (
        <CircularProgress />
      )}
      </div>
    );

  }

};

Loader.propTypes = {
  target: PropTypes.string,
  percent: PropTypes.number
};

export default Loader;
