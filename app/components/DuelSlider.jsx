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
      min,
      max,
      stages,
      dataSource,
      storeValue,
    } = this.props;

    let sliderStyle = {
      width: "73%",
      margin: '0 auto 10px'
    }
    
    if (this.props.style) {
      sliderStyle = {...sliderStyle, ...this.props.style}
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
        <div style={{height: '40px'}}>
          <ReactSlider 
            style={sliderStyle} 
            step={1}
            minDistance={1}
            defaultValue={[min, max]}
            onAfterChange={this.handleChange.bind(this)} 
            withBars
          />
          {labelItems}
        </div>
      </div>
    );

  }

};

DuelSlider.propTypes = {
};

export default DuelSlider;