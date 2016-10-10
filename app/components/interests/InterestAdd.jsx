import React, { PropTypes } from 'react';

import { validateInterestHelper } from '../helpers/interestValidation';

import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';
import _ from 'lodash';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/interest';
const cx = classNames.bind(styles);

let timeout;

export default class InterestAdd extends React.Component {

  static propTypes = {
    isEdit: PropTypes.bool.isRequired, 
    interest: PropTypes.object.isRequired,
    interestChange: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    addVisible: PropTypes.bool,
    onInterestSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  state = {
    validationErrors: {},
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {
      this.props.onInterestSave(this.props.interest);
    }
  }
  
  validate() {
    const validationResp = validateInterestHelper(this.props.interest, this.state.validationErrors);
    this.setState({validationErrors: validationResp.errors});
    return validationResp.containsErrors;
  }

  changeInterestProps(field, value) {
    this.setState({validationErrors: {}})
    this.props.interestChange({
      field: field,
      value: value,
      id: this.props.interest._id
    });
  }

  handleExpand(next) {
    if (this.props.interest.interest !== next) {
      if(timeout) { clearTimeout(timeout); }
      timeout = setTimeout(() => {
        !this.props.addVisible && this.props.interest.interest ? this.props.toggleEdit() : null
      }, 500)
    } 
  }

  sliderChange(field, value) {
    this.changeInterestProps(field, value)
  }

  handleChange = field => (e, i, uiVal) => {
    if (!this.props.addVisible) {
      this.handleExpand(value) 
    }
    let value;
    if (uiVal) {
      value = uiVal
    } else {
      value = e.target.value
    }
    this.changeInterestProps(field, value);
  }

  render () {
    const {
            validationErrors
          } = this.state;

    const {
            interest,
            addVisible,
            isEdit
          } = this.props;
    
    let interestText = 'Add a Interest';
    if (isEdit) interestText = 'Interest';

    return (
      <div>
        <form
          className={cx('interestAdd--form')}
          onSubmit={this.handleSubmit}
        >
          <TextField
            value={interest.interest}
            floatingLabelText="Interest"
            errorText={validationErrors.interest}
            onChange={this.handleChange('interest')}
          />

          { addVisible || isEdit ? (
            <span>
              <div className={cx('profile-btn-group')}>
                <RaisedButton className='pull-right' type="submit" label="Save" primary={true} />
                {this.props.handleDelete ? (
                  <FlatButton className='pull-left' label="Delete" onClick={this.props.handleDelete} primary={true} />
                ) : (<span />)}
                <FlatButton className='pull-left' label="Close" onClick={this.props.toggleEdit} primary={true} />
              </div>

            </span>
          
          ) : (null)}
        </form>
      </div>
    )
  }
};