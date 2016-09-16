import React, { PropTypes } from 'react';

import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(moment)

// import 'react-widgets/lib/less/react-widgets.less';
import classNames from 'classnames/bind';
import styles from 'css/components/datePicker';
const cx = classNames.bind(styles);

export default class DatePicker extends React.Component {
  
  static propTypes = {
    // name: PropTypes.string,
    // data: PropTypes.obj,
    // validationErrors: PropTypes.obj,
  }

  constructor(props) {
    super(props)
  }

  handleDateChange(e, uiVal) {
    const value = moment(new Date(e)).format();
    this.props.onDateChange(this.props.name + "Date", value)
  }

  render () {
    const { 
            data,
            name,
            validationErrors,
          } = this.props;

    const inputClass = classNames({
      'rw-date-picker': true,
      'error': validationErrors.startDate && name === 'start',
      'error': validationErrors.endDate && name === 'end',
    });
      
    const err = (
      <div className={cx('err-msg')}>{validationErrors[name + 'Date']}</div>
    )

    if (data && data !== '') {
      return (
        <div className='col-md-6'>
          <DateTimePicker
            defaultValue={new Date(data)}
            max={new Date()} 
            className={inputClass}
            onChange={this.handleDateChange.bind(this)}
            format={"MM/YYYY"}
            editFormat={'MM/YYYY'}
            time={false}
            initialView={"year"}
            placeholder='mm/yyyy'
          />
          {err}
        </div>
    )} else {
      return (
        <div className='col-md-6'>
          <DateTimePicker
            max={new Date()} 
            className={inputClass}
            onChange={this.handleDateChange.bind(this)}
            format={"MM/YYYY"}
            editFormat={'MM/YYYY'}
            time={false}
            initialView={"year"}
            placeholder='mm/yyyy'
          />
          {err}
        </div>
      )
    }

  }
};