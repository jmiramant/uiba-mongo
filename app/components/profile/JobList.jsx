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
    onJobSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = { addVisibile: false } ;
  }
  
  showAddJob = () => {
    this.setState({addVisibile: true})
  }

  handleSave = (data) => {
    const { onJobSave } = this.props;
    onJobSave(data);
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
          <JobAdd addVisibile={addVisibile} onJobSave={this.handleSave} />
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