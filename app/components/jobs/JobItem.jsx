import React, { PropTypes } from 'react';

import JobAdd from 'components/jobs/JobAdd';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Divider from 'material-ui/Divider';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
const cx = classNames.bind(styles);

export default class JobItem extends React.Component {
  
  static propTypes = {
    job: PropTypes.object.isRequired, 
    jobChange: PropTypes.func.isRequired,
    saveJobEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  state = {
    edit: false,
  }

  toggleEdit () {
    this.props.toggleEdit(this.props.job);
  }

  saveEdit (job) {
    this.props.saveJobEdit(job)
    this.toggleEdit()
  }

  handleDelete () {
    this.props.handleDelete(this.props.job)
  }

  render () {
    const { 
            isntLast, 
            job, 
            jobChange,
            editShow
          } = this.props;

    let descId = 0;

    if (job.edit) {

      return (
        <JobAdd
          job={job}
          jobChange={jobChange}
          addVisible={editShow}
          onJobSave={this.saveEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)}
        />

      )
    
    } else {

      return (
        <div className={cx('jobItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          
          <EditIcon
            color="#66747F"
            hoverColor="#f20253"
            onClick={this.toggleEdit.bind(this)}
            className={cx("schoolItem--edit") + ' pull-right'}
          />

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
  
  }
};