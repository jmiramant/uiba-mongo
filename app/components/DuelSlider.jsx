import React, { PropTypes } from 'react';
import ReactSlider from 'react-slider';
import "css/lib/slider.less";
import classNames from 'classnames/bind';
import styles from 'css/components/slider';
const cx = classNames.bind(styles);

class DuelSlider extends React.Component {

  constructor(props) {
    super(props)
  }

  handleChange(val){
    this.props.handleChange(val)
  }

  componentWillMount() {
    const { dataSource } = this.props;
    
    const update = _.map(dataSource, (range, i) => {
      if (i === 0) { return 0}
      if (i === 1) { return 10}
    })

    if (dataSource[0] !== update[0] || dataSource[1] !== update[1]) {this.handleChange(update)}
  }

  render() {
    const {
      stages,
      dataSource,
      storeValue,
    } = this.props;

    let sliderStyle = {
      width: "73%",
      margin: '0 auto 10px'
    }
    
    if (this.props.style) {
      sliderStyle = Object.assign({}, sliderStyle, this.props.style)
    }

    const itemStyle = {
      width: ((100 / stages.length).toString() + '%')
    }

    const labelItems = (
      <div className={cx('stage-label-container')}>
        {stages.map((stage, i) => {
          let itemClass = classNames({
            [cx('stage-label')]: true,
            [cx('active')]: stages.indexOf(dataSource) === i,
          });
          
          if (storeValue) {
            itemClass = classNames({
              [cx('stage-label')]: true,
              [cx('active')]: storeValue.indexOf(dataSource) === i,
            });
          } 
          return (<div
                    key={i + stage}
                    style={itemStyle}
                    className={itemClass}
                  >
                    {stage}
                  </div>);
        })}
      </div>
    )

    return (
      <div className='duel-slider-container'>
      <div style={{height: '200px'}}>
        <ReactSlider style={sliderStyle} min={0} max={10} onAfterChange={this.handleChange.bind(this)} defaultValue={[0, 10]} withBars ></ReactSlider>
        {labelItems}
      </div>
      </div>
    );

  }

};

DuelSlider.propTypes = {
};

export default DuelSlider;