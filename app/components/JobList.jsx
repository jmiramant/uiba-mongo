import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/jobList';
import moment from 'moment';
import JobItem from 'components/JobItem';

const cx = classNames.bind(styles);

export default class JobBox extends React.Component {
  
  static propTypes = {
    jobs: PropTypes.array,
    onAddJob: PropTypes.func
  }
  
  handleAddJob = (id) => {
    this.props.onAddJob(id);
  }

  render () {
    let { jobs } = this.props;
    let lengthIndex = jobs.length - 1;

    return (
      (<div className={cx('jobList--container') + ' col-md-8'}>
        {jobs.map((job, i) => {
            return (<JobItem key={job._id} job={job} isntLast={lengthIndex !== i} />);
        })}
        <div>
          <div onClick={this.handleAddJob} className='pull-left'>Add Job</div>
          <div className='pull-right'>Edit Job</div>
        </div>
      </div>)
    )
  }
};