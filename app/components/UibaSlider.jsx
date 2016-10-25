import React, { PropTypes } from 'react';

import Slider from 'material-ui/Slider';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/uibaSlider';
const cx = classNames.bind(styles);

export default class UibaSlider extends React.Component {
  
  static propTypes = {
    title: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    dataSource: PropTypes.object.isRequired,
    stages: PropTypes.array.isRequired,
    storeValue: PropTypes.array,
    errorText: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  sliderChange(e, val) {
    let value = this.props.stages[val];
    if (this.props.storeValue) {
        value = this.props.storeValue[val];
    }
    this.props.handleChange(this.props.field, value)
  }

  jumpToStage = stage => e => {
    let value = this.props.stages[stage];
    if (this.props.storeValue) {
        value = this.props.storeValue[stage];
    }
    this.props.handleChange(this.props.field, value)
  }

  render () {

    const { 
            title,
            dataSource,
            stages,
            field,
            storeValue,
            errorText
          } = this.props;


    let sliderStyle = {
      width: "78%",
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
            [cx('active')]: stages.indexOf(dataSource[field]) === i,
          });
          
          if (storeValue) {
            itemClass = classNames({
              [cx('stage-label')]: true,
              [cx('active')]: storeValue.indexOf(dataSource[field]) === i,
            });
          } 
          
          return (<div
                    key={i + stage}
                    className={itemClass}
                    onClick={this.jumpToStage(i)}
                    style={itemStyle}
                  >
                    {stage}
                  </div>);
        })}
      </div>
    )

    const sliderValue = () => {
      if (dataSource[field]) {
        if (storeValue) {
          return storeValue.indexOf(dataSource[field])
        } else {
          return stages.indexOf(dataSource[field]);
        }
      } else {
        return 0;
      }
    }

    const errorMsg = errorText && errorText.length > 0 ? (
      <div className={cx('errors')}>{errorText}</div>
    ) : (null)

    return (
      <div className={cx('uiba-slider-container')}>
        <div className={cx('title')}>{title}</div>
        <Slider 
          step={1} 
          value={sliderValue()}
          sliderStyle={sliderStyle}
          min={0}
          max={stages.length - 1}
          onChange={this.sliderChange.bind(this)}
        />
        {labelItems}
        {errorMsg}
      </div>
    )
  }
};