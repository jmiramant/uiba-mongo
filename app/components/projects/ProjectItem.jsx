import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import styles from 'css/components/profile/jobItem';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import moment from 'moment';

const cx = classNames.bind(styles);
const intialProjectState = {
  name: '', 
  projectUrl: '',
  startDate: '',
  endDate: '',
  current: false
}

export default class ProjectItem extends React.Component {
  
  static propTypes = {
    saveEdit: PropTypes.func,
    handleDelete: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  state = {
    project: { ...this.props.project }, 
    current: this.props.project.current,
    persistedProject: { ...this.props.project }, 
    edit: false,
    validate: _.clone(intialProjectState)
  }

  toggleEdit () {
    if (this.state.edit) {
      this.setState({project: this.state.persistedProject})
    }

    this.setState({edit: !this.state.edit})

  }

  saveEdit () {
    if (!this.isDataValid()) {
      this.props.saveEdit(this.state.project)
      this.toggleEdit()
    }
  }

  handleDelete () {
    this.props.handleDelete(this.state.project)
  }

  isDataValid() {
    // const validationResp = validateProjectFormHelper(_.clone(intialProjectState), this.state);
    // this.setState({validate: validationResp.error});
    // return containsErrors(validationResp.error)
    return false
  }
  
  handleChange = field => e => {
    var value = e.target.value
    if (e.target.type === 'checkbox') {
      value = this.state.current
      this.setState({
        current: !this.state.current,
        project: {
            ...this.state.project,
          [field] : !this.state.current
        }
      })
    } else {
      this.setState({
          project: {
            ...this.state.project,
          [field] : value
          }
      });
    }
  }

  formatDateString(date) {
    return moment(new Date(date)).format('YYYY-MM-DD')
  };


  render () {
    const { project } = this.props;
    const { current, validate } = this.state;

    const errorMsgs = _.reject(validate, (v,k) => {
      return v === '';
    })

    const addComma = (v, i, ct) => {
      if ((i+1) === ct.length) {
        return v;
      } else {
        return v + ', ';
      }
    }

    if (this.state.edit) {

      return (
        <div className={cx('projectItem--container')}>
          {errorMsgs}

          <input 
            type='text'
            value={this.state.project.name}
            onChange={this.handleChange('name')}
            className={ cx('projectEdit--name')}
            id="name"  />
          
          <input 
            type='text'
            value={this.state.project.projectUrl}
            onChange={this.handleChange('projectUrl')}
            className={ cx('projectEdit--projectUrl')}
            id="projectUrl"  />

          <input 
            type="date"
            value={this.formatDateString(this.state.project.startDate)} 
            onChange={this.handleChange('startDate')}
            className={cx('projectEdit--startDate')}
            id="startDate" />
          { !current ? (
            <input 
              type="date"
              value={this.formatDateString(this.state.project.endDate)} 
              onChange={this.handleChange('endDate')} 
              className={cx('projectEdit--endDate')}
              id="endDate" />
            ) : (<span />)
          }

          <input 
            type="checkbox"
            checked={current}
            onChange={this.handleChange('current')} />

          <div className={ cx('projectEdit--controls') }>
            <div className={ cx('projectEdit--buttons') + ' pull-left'} onClick={this.toggleEdit.bind(this)}>Close</div>
            <div className={ cx('projectEdit--buttons', 'projectEdit--button-delete')} onClick={this.handleDelete.bind(this)}>Delete</div>
            <div className={ cx('projectEdit--buttons') + ' pull-right'} onClick={this.saveEdit.bind(this)}>Save</div>
          </div>
          <div className={cx('projectItem--spacer')}></div>
        </div>
      )
    
    } else {

      return (
        <div className={cx('projectItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          <div onClick={this.toggleEdit.bind(this)} className={cx('projectItem--edit')}></div>
          <p className={cx("projectItem--header")}><span className={ cx('projectItem--name')}>{project.name}</span></p>
          <p className={cx("projectItem--projectUrl")}>{project.projectUrl}</p>
          <p className={cx("projectItem--date")}>{moment(project.startDate).format('MMM, YYYY')} - { current ? ( 'Current' ) : ( moment(project.endDate).format('MMM, YYYY')) } </p>
          


          <div className={cx('projectItem--spacer')}></div>
        </div>
      )

    }
  
  }
};