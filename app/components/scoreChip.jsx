import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import classNames from 'classnames/bind';
import styles from 'css/components/scoreChip';
const cx = classNames.bind(styles);

export default class ScoreChip extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {
      score
    } = this.props;

    return (
      <div className={cx('container')}>
        { score ? (
          <span className={cx('score-text')}>{score}</span>
        ) : (
          <LinearProgress 
            style={{marginTop: '6px', paddingTop: '6px'}}
          />
        )}
      </div>
    );

  }

};

ScoreChip.propTypes = {
  score: PropTypes.string
};