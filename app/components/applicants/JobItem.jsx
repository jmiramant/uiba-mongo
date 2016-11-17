import React, { PropTypes } from 'react';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
const cx = classNames.bind(styles);

export default class JobItem extends React.Component {
  
  static propTypes = {
    job: PropTypes.object.isRequired, 
  }

  constructor(props) {
    super(props);
  }

  render () {
    const { 
      job, 
    } = this.props;

    let descId = 0;

    return (
      <div className={cx('jobItem--container')}>

        <h4 className={cx("jobItem--header")}>
          <span className={ cx('jobItem--name')}>
            {job.companyName}
          </span> | <span className={cx('jobItem--title')}>
            {job.title}
          </span>
        </h4>
        
        <p className={cx("jobItem--date")}>
          {moment(job.startDate).format('MMM, YYYY')} - { job.current ? ( 'Current' ) : ( moment(job.endDate).format('MMM, YYYY')) } 
        </p>

        <div className={cx("jobItem--description")}>
          {job.description.split('\n').map((item) => {
            let key = job._id + item + descId
            return (
              <span key={key}>{item}<br/></span>
            )
            descId++
          })}
        </div>
      </div>
    )
  
  }
};