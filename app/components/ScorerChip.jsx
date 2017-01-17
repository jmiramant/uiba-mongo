import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import classNames from 'classnames/bind';
import styles from 'css/components/scoreChip';
let cx = classNames.bind(styles);

class ScoreChip extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {
      score,
      isFetching
    } = this.props;

    const rScore = Math.round(score * 100)

    let scoreClass = cx({
      container: true,
      naDigit: score === undefined,
      oneDigit: rScore.toString().length === 1,
      twoDigit: rScore.toString().length === 2,
      threeDigit: rScore.toString().length === 3,
    });

    return (
      <div className={cx(scoreClass)}>
        { score ? (
          <span className={cx('score-text')}>{rScore}</span>
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