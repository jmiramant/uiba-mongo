import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobList';
import moment from 'moment';
import JobItem from 'components/jobs/JobItem';
import JobAdd from 'components/jobs/JobAdd';

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
    this.props.onJobSave(data);
    this.setState({addVisibile: false})
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (job) => {
    this.props.onJobDelete(job);
  }

  render () {
    let { jobs } = this.props;
    let lengthIndex = jobs.length - 1;
    const { addVisibile } = this.state;

    return (
      <div className={cx('jobList--container') + ' col-md-7 col-md-offset-1'}>
        {jobs.map((job, i) => {
            return (<JobItem 
                      key={job._id} 
                      saveJobEdit={this.handleEditSave} 
                      handleDelete={this.handleDelete}
                      job={job} 
                      isntLast={lengthIndex !== i} />);
        })}

        { this.state.addVisibile ? (
          <JobAdd addVisibile={addVisibile} onJobSave={this.handleSave} />
        ) : (
          <div>
            <div onClick={this.showAddJob} className='pull-right'>Add Job</div>
          </div>
        ) }
      </div>
    )
  }
};