import React, { PropTypes } from 'react';

import { validateInterestHelper } from '../helpers/interestValidation';

import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
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
    const { interest, addVisible, toggleEdit } = this.props;
    if (interest.interest !== next) {
      if(timeout) { clearTimeout(timeout); }
      timeout = setTimeout(() => {
        !addVisible && interest.interest && !interest.edit ? toggleEdit() : null
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
          } = this.props;

    let iText = interest.interest
    !interest.interest ? iText = '' : null

    let interestText = 'Add a Interest';
    if (interest.edit) interestText = 'Interest';

    return (
      <div>
        <form
          className={cx('interestAdd--form')}
          onSubmit={this.handleSubmit}
        >
          <TextField
            value={iText}
            floatingLabelText="Add a Interest"
            errorText={validationErrors.interest}
            onChange={this.handleChange('interest')}
          />

          { addVisible || interest.edit ? (
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