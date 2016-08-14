import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobList';
import moment from 'moment';
import JobItem from 'components/profile/JobItem';
import JobAdd from './JobAdd';

const cx = classNames.bind(styles);

export default class JobList extends React.Component {
  
  static propTypes = {
    jobs: PropTypes.array,
    saveNewJob: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { addVisibile: false } ;
  }
  
  showAddJob = () => {
    this.setState({addVisibile: true})
  }

  saveNewJob = (data) => {
    this.props.saveNewJob(data)
    this.setState({addVisibile: false})
  }

  render () {
    let { jobs } = this.props;
    let lengthIndex = jobs.length - 1;
    const { addVisibile } = this.state;

    return (
      <div className={cx('jobList--container') + ' col-md-7'}>
        {jobs.map((job, i) => {
            return (<JobItem key={job._id} job={job} isntLast={lengthIndex !== i} />);
        })}

        { this.state.addVisibile ? (
          <JobAdd addVisibile={addVisibile} saveNewJob={this.saveNewJob} />
        ) : (
          <div>
            <div onClick={this.showAddJob} className='pull-left'>Add Job</div>
            <div className='pull-right'>Edit Job</div>
          </div>
        ) }
      </div>
    )
  }
};