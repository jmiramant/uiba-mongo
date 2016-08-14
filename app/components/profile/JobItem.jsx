import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
import moment from 'moment';

const cx = classNames.bind(styles);

export default class JobItem extends React.Component {
  
  static propTypes = {
    job: PropTypes.object
  }

  render () {
    let { isntLast, job } = this.props;
    
    return (
      <div className={cx('jobItem--container')}>
        <p className={cx("jobItem--header")}><span className={ cx('jobItem--name')}>{job.companyName}</span> | <span className={cx('jobItem--title')}>{job.title}</span></p>
        <p className={cx("jobItem--date")}>{moment(job.startDate).format('MMM, YYYY')} - {moment(job.endDate).format('MMM, YYYY')}</p>
        <p className={cx("jobItem--description")}>{job.description}</p>
        <div className={cx('jobItem--spacer')}></div>
      </div>
    )
  }
};