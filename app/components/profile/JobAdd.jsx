import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);
const intialJobState = {
    company: '', 
    title: '', 
    startDate: '',
    endDate: '',
    description: '',
  }

export default class JobAdd extends React.Component {

  static defaultProps = {
    jobs: _.clone(intialJobState)
  }

  constructor(props) {
    super(props)
  }

  state = {
    job: { ...this.props.job }, 
  }
  
  handleSubmit = e => {

    e.preventDefault();
    this.props.onJobSave(this.state.job);

    this.setState({
      job: _.clone(intialJobState),
    })

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
    return (
      <div>
        <form
          className="wrapper"
          onSubmit={this.handleSubmit}
        >
          <div className="panel">

            <div className="form-group row">
              <label htmlFor="company" className="col-xs-2 col-form-label">Company Name</label>
              <div className="col-xs-10">
                <input onChange={this.handleChange('company')} className="form-control" type="text" id="company" />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="title" className="col-xs-2 col-form-label">Title</label>
              <div className="col-xs-10">
                <input onChange={this.handleChange('title')} className="form-control" type="text" id="title" />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="startDate" className="col-xs-2 col-form-label">Start Date</label>
              <div className="col-xs-5">
                <input onChange={this.handleChange('startDate')}  className="form-control" type="date" id="startDate" />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="endDate" className="col-xs-2 col-form-label">End Date</label>
              <div className="col-xs-5">
                <input onChange={this.handleChange('endDate')} className="form-control" type="date" id="endDate" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea onChange={this.handleChange('description')}  className="form-control" id="description" rows="3"></textarea>
            </div>

            <button
              className="btn"
              type="submit"
            >
             Save
            </button>

          </div>
        </form>
      </div>
    )
  }
};