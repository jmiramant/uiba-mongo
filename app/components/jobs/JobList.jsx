import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as jobsActionCreators from 'actions/jobs';

import JobItem from 'components/jobs/JobItem';
import JobAdd from 'components/jobs/JobAdd';
import NullProfItem from 'components/ProfileNull';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobList';
import moment from 'moment';
const cx = classNames.bind(styles);

class JobList extends React.Component {
  
  static propTypes = {
    jobs: PropTypes.array,
    addVisible: PropTypes.bool.isRequired,
    onEditSave: PropTypes.func.isRequired,
    toggleJobAdd: PropTypes.func.isRequired,
    onJobSave: PropTypes.func.isRequired,
    onJobDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }
  
  toggleAddJob = () => {
    this.props.toggleJobAdd(this.props.addVisible)
  }

  handleSave = (data) => {
    this.props.onJobSave(data);
    this.props.toggleJobAdd(this.props.addVisible)
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (job) => {
    this.props.onJobDelete(job);
  }

  handleExpand(next) {
    if (this.props.jobs.type !== next) {
      if(timeout) { clearTimeout(timeout); }
      timeout = setTimeout(() => {
        !this.props.addVisible && this.props.skill.type ? this.props.toggleEdit() : null
      }, 500)
    } 
  }

  render () {
    const { job,
            jobs,
            addVisible,
            actions
          } = this.props;
    const lengthIndex = jobs.length - 1;

    const renderItems = (
      <div>
        {jobs.map((job, i) => {
            return (<JobItem 
                      key={job._id} 
                      job={job} 
                      jobChange={actions.jobsChange} 
                      saveJobEdit={this.handleEditSave} 
                      handleDelete={this.handleDelete}
                      isntLast={lengthIndex !== i} 
                    />);
        })}
      </div>
    )

    return (
      <div className={cx('jobList--container')}>

        { jobs.length ? (
          <div>
            {renderItems}
          </div>
        ) : (
          <span>
            <NullProfItem target="job" />
          </span>
        )}

        <JobAdd
          job={job}
          onJobSave={this.handleSave} 
          jobChange={actions.jobChange}
          toggleEdit={this.toggleAddJob.bind(this)} 
          addVisible={addVisible} 
        />

      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    job: state.job.job
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(jobsActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobList);