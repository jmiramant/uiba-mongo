import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
import moment from 'moment';

const cx = classNames.bind(styles);

export default class JobItem extends React.Component {
  
  static propTypes = {
    saveJobEdit: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  state = {
    job: { ...this.props.job }, 
    persistedJob: { ...this.props.job }, 
    edit: false,
  }

  toggleEdit () {
    if (this.state.edit) {
      this.setState({job: this.state.persistedJob})
    }

    this.setState({edit: !this.state.edit})

  }

  saveEdit () {
    this.props.saveJobEdit(this.state.job)
    this.toggleEdit()
  }
  
  handleChange = field => e => {

    e.preventDefault();

    this.setState({
      job: {
        ...this.state.job,
        [field] : e.target.value
      },
    });
  }

  formatDateString(date) {
    return moment(new Date(date)).format('YYYY-MM-DD')
  };


  render () {
    let { isntLast, job } = this.props;
    
    if (this.state.edit) {

      return (
        <div className={cx('jobItem--container')}>
          <div>
            <input 
              type='text'
              value={this.state.job.companyName}
              onChange={this.handleChange('companyName')} 
              id="companyName"  />
              | 
            <input 
              type='text'
              value={this.state.job.title} 
              onChange={this.handleChange('title')} 
              id='title' />
          </div>
          <input 
            type="date"
            value={this.formatDateString(this.state.job.startDate)} 
            onChange={this.handleChange('startDate')} 
            id="startDate" />
          <input 
            type="date"
            value={this.formatDateString(this.state.job.endDate)} 
            onChange={this.handleChange('endDate')} 
            id="endDate" />
          <textarea 
            type='text'
            value={this.state.job.description}
            onChange={this.handleChange('description')} 
            id='description' />
          <div className={ cx('jobEdit--controls') }>
            <div className={ cx('jobEdit--buttons') + ' pull-left'} onClick={this.toggleEdit.bind(this)}>Close</div>
            <div className={ cx('jobEdit--buttons') + ' pull-right'} onClick={this.saveEdit.bind(this)}>Save</div>
          </div>
          <div className={cx('jobItem--spacer')}></div>
        </div>
      )
    
    } else {

      return (
        <div className={cx('jobItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          <div onClick={this.toggleEdit.bind(this)} className={cx('jobItem--edit')}></div>
          <p className={cx("jobItem--header")}><span className={ cx('jobItem--name')}>{job.companyName}</span> | <span className={cx('jobItem--title')}>{job.title}</span></p>
          <p className={cx("jobItem--date")}>{moment(job.startDate).format('MMM, YYYY')} - {moment(job.endDate).format('MMM, YYYY')}</p>
          <p className={cx("jobItem--description")}>{job.description}</p>
          <div className={cx('jobItem--spacer')}></div>
        </div>
      )

    }
  
  }
};