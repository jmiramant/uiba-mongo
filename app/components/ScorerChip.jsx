import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import classNames from 'classnames/bind';
import styles from 'css/components/scoreChip';
const cx = classNames.bind(styles);

class ScoreChip extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {
      score,
      isFetching
    } = this.props;

    return (
      <div className={cx('container')}>
        { score ? (
          <span className={cx('score-text')}>{score}</span>
        ) : (
          <span>
            {isFetching ? (
              <LinearProgress 
                style={{marginTop: '6px', paddingTop: '6px'}}
              />
            ) : (<div style={{marginLeft: '-7px', color: '#666'}}>N/A</div>) }
          </span>

        )}
      </div>
    );

  }

};

ScoreChip.propTypes = {
  score: PropTypes.string
};

export default ScoreChip