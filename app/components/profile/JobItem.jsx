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
    edit: false,
  }

  toggleEdit () {
    
    if (this.state.edit) {
      this.props.saveJobEdit(this.state.job)
    }

    this.setState({edit: !this.state.edit})

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



  render () {
    let { isntLast, job } = this.props;
    
    if (this.state.edit) {

      return (
        <div className={cx('jobItem--container')}>
          <div 
            onClick={this.toggleEdit.bind(this)} 
            className={cx('jobItem--edit')}>
          </div>
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
            value={moment(this.state.job.startDate).format('YYYY-MM-DD')} 
            onChange={this.handleChange('startDate')} 
            id="startDate" />
          <input 
            type="date"
            value={moment(this.state.job.endDate).format('YYYY-MM-DD')} 
            onChange={this.handleChange('endDate')} 
            id="endDate" />
          <textarea 
            type='text'
            value={this.state.job.description}
            onChange={this.handleChange('description')} 
            id='description' />
          <div className={cx('jobItem--spacer')}></div>
        </div>
      )
    
    } else {

      return (
        <div className={cx('jobItem--container')}>
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