import React, { PropTypes } from 'react';
import update from 'react-addons-update'
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
import { containsErrors } from '../helpers/CommonFormValidations';
import { validateJobFormHelper } from '../helpers/jobFormValidation';
import moment from 'moment';

const cx = classNames.bind(styles);
const intialJobState = {
    company: '', 
    title: '', 
    startDate: '',
    endDate: '',
    description: '',
  }

export default class JobItem extends React.Component {
  
  static propTypes = {
    saveJobEdit: PropTypes.func,
    handleDelete: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  state = {
    job: { ...this.props.job }, 
    current: this.props.job.current,
    persistedJob: { ...this.props.job }, 
    edit: false,
    validate: _.clone(intialJobState)
  }

  toggleEdit () {
    if (this.state.edit) {
      this.setState({job: this.state.persistedJob})
    }

    this.setState({edit: !this.state.edit})

  }

  saveEdit () {
    if (!this.validate()) {
      this.props.saveJobEdit(this.state.job)
      this.toggleEdit()
    }
  }

  handleDelete () {
    this.props.handleDelete(this.state.job)
  }

  validate() {
    const validationResp = validateJobFormHelper(_.clone(intialJobState), this.state);
    this.setState({validate: validationResp.error});
    return containsErrors(validationResp.error)
  }
  
  handleChange = field => e => {
    var value = e.target.value
    if (e.target.type === 'checkbox') {
      value = this.state.current
      this.setState({
        current: !this.state.current,
        job: {
            ...this.state.job,
          [field] : !this.state.current
        }
      })
    } else {
      this.setState({
          job: {
            ...this.state.job,
          [field] : value
          }
      });
    }
  }

  formatDateString(date) {
    return moment(new Date(date)).format('YYYY-MM-DD')
  };


  render () {
    const { isntLast, job } = this.props;
    const { validate, current } = this.state;

    const errorMsgs = _.reject(validate, (v,k) => {
      return v === '';
    })

    if (this.state.edit) {

      return (
        <div className={cx('jobItem--container')}>
          {errorMsgs}
          <div className={cx('jobEdit--header')}>
            <input 
              type='text'
              value={this.state.job.companyName}
              onChange={this.handleChange('companyName')}
              className={ cx('jobEdit--name')}
              id="companyName"  />
              | 
            <input 
              type='text'
              value={this.state.job.title} 
              onChange={this.handleChange('title')} 
              className={ cx('jobEdit--title')}
              id='title' />
          </div>
          <input 
            type="date"
            value={this.formatDateString(this.state.job.startDate)} 
            onChange={this.handleChange('startDate')}
            className={cx('jobEdit--startDate')}
            id="startDate" />
          { !current ? (
            <input 
              type="date"
              value={this.formatDateString(this.state.job.endDate)} 
              onChange={this.handleChange('endDate')} 
              className={cx('jobEdit--endDate')}
              id="endDate" />
            ) : (<span />)
          }
          <input 
            type="checkbox"
            checked={current}
            onChange={this.handleChange('current')} />
          <textarea 
            type='text'
            value={this.state.job.description}
            className={cx('jobEdit--description')}
            onChange={this.handleChange('description')} 
            id='description' />
          <div className={ cx('jobEdit--controls') }>
            <div className={ cx('jobEdit--buttons') + ' pull-left'} onClick={this.toggleEdit.bind(this)}>Close</div>
            <div className={ cx('jobEdit--buttons', 'jobEdit--button-delete')} onClick={this.handleDelete.bind(this)}>Delete</div>
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
          <p className={cx("jobItem--date")}>{moment(job.startDate).format('MMM, YYYY')} - { current ? ( 'Current' ) : ( moment(job.endDate).format('MMM, YYYY')) } </p>
          <p className={cx("jobItem--description")}>{job.description}</p>
          <div className={cx('jobItem--spacer')}></div>
        </div>
      )

    }
  
  }
};