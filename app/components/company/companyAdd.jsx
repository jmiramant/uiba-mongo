import React, { PropTypes } from 'react';

import UibaDatePicker from '../../components/DatePicker';
import { validateCompanyHelper } from '../helpers/companyValidations';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import _ from 'lodash';

import styles from 'css/components/company/companyAdd';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
let timeout;

export default class CompanyAdd extends React.Component {
  
  static propTypes = {
    company: PropTypes.object.isRequired,
    companyChange: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    addVisible: PropTypes.bool,
    onCompanySave: PropTypes.func.isRequired
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
      this.props.onCompanySave(this.props.company);
    }
  }
  
  validate() {
    const validationResp = validateCompanyHelper(this.props.company, this.state.validationErrors);
    this.setState({validationErrors: validationResp.errors});
    return validationResp.containsErrors;
  }

  changeCompanyProps(field, value) {
    this.setState({validationErrors: {}})
    this.props.companyChange({
      field: field,
      value: value,
      id: this.props.company._id
    });  
  }

  handleDateChange = (field, value) => {
    this.changeCompanyProps(field, value);
  }

  handleExpand(next) {
    if (this.props.company.companyName !== next) {
      if(timeout) { clearTimeout(timeout); }
      timeout = setTimeout(() => {
        !this.props.addVisible && this.props.company.companyName ? this.props.toggleEdit() : null
      }, 500)
    } 
  }

  handleChange = field => (e, uiVal) => {
    if (!this.props.addVisible) {
      this.handleExpand(value) 
    }
    let value;
    if (uiVal) {
      if (typeof(Object.getPrototypeOf(uiVal).getTime) === 'function') {
        value = moment(new Date(uiVal)).format();
      } else {
        value = uiVal
      }
    } else if (e.value) {
      value  = e.value[0];
    } else {
      value = e.target.value;
    }

    if (e && e.target && e.target.type === 'checkbox') {

      this.changeCompanyProps(field, !this.props.company.current)

    } else {

      this.changeCompanyProps(field, value)

    }
  }

  render () {
    const {
            validationErrors
          } = this.state;

    const {
            addVisible,
            company,
          } = this.props;

    const isVisible = addVisible ? '' : ' ' + cx('closed');

    return (
      <div className={cx('companyAdd-container') + isVisible}>
        <form>

          <div className="col-md-6">
            <TextField
              value={company.name}
              errorText={validationErrors.name}
              floatingLabelText="Add a Company"
              onChange={this.handleChange('companyName')}
            />
          </div>
          
        </form>
      </div>
    )
  }
};