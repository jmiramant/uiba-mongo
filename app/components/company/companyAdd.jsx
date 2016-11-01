import React, { PropTypes } from 'react';

import { validateCompanyHelper } from '../helpers/companyValidations';

import industryData from './industryData';

import UibaDatePicker from '../../components/DatePicker';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import AddressInput from 'containers/Address'
import CompanyNameTypeahead from '../../containers/CompanyNameTypeahead';

import _ from 'lodash';

import styles from 'css/components/company/companyAdd';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
let timeout;

const IndustryData = industryData();

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
    showAddress: false
  }

  disableEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }
  
  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {
      this.props.onCompanySave(this.props.company);
    }
  }
  
  showAddress(e) {
    console.log(e)
    // this.setState({showAddress: true});
  }

  validate() {
    const validationResp = validateCompanyHelper(this.props.company, this.state.validationErrors);
    this.setState({validationErrors: validationResp.errors});
    return validationResp.containsErrors;
  }
  
  formatURL(url) {
    const isHttps = url.includes('https')
    const isHttp = url.includes('http')
    if (!isHttp && !isHttps) {
      return "http://" + url
    } else {
      return url
    }
  }

  changeCompanyProps(field, value) {
    this.setState({validationErrors: {}})
    this.props.companyChange({
      field: field,
      value: value,
      id: this.props.company._id
    });  
  }

  handleSize = (e, i, val) => {
    this.changeCompanyProps('size', val)
  }
  
  handleName = val => {
    this.changeCompanyProps('name', val)
  }

  handleDateChange = (field, value) => {
    this.changeCompanyProps(field, value);
  }

  handleIndustryChange (value) {
    this.changeCompanyProps('industry', value)
  }

  handleChange = field => (e, value) => {
    if (field === 'websiteUrl') value = this.formatURL(value)
    this.changeCompanyProps(field, value)
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
            <CompanyNameTypeahead 
              selection={company.name}
              initial={company.name}
              error={validationErrors.name}
              handleChange={this.handleName.bind(this)}
            />
          </div>

          <DropzoneS3Uploader
            signingUrl="/s3/sign"
            accept="image/*"
            s3Url='https://uiba-test.s3.amazonaws.com'
            uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
            contentDisposition="auto"
          />

          <div className="col-md-6">
            <TextField
              value={company.description}
              errorText={validationErrors.description}
              floatingLabelText="Description"
              onChange={this.handleChange('description')}
            />
          </div>

          <UibaDatePicker
            data={company.foundedDate}
            name='founded'
            onDateChange={this.handleDateChange}
            validationErrors={validationErrors}
          />

          <SelectField
            style={{minWidth: "320px"}}
            errorText={validationErrors.size}
            onChange={this.handleSize}
            value={company.size}
            floatingLabelText="Company Size"
            hintText='Company Size'
          >
            <MenuItem value={'10'} primaryText="1-10" />
            <MenuItem value={"20"} primaryText="11-20" />
            <MenuItem value={'50'} primaryText="21-50" />
            <MenuItem value={'100'} primaryText="51-100" />
            <MenuItem value={'250'} primaryText="101-250" />
            <MenuItem value={'500'} primaryText="251-500" />
            <MenuItem value={'501'} primaryText=">500" />
          </SelectField>

          <div className="col-md-6">
            <TextField
              value={company.websiteUrl}
              errorText={validationErrors.websiteUrl}
              floatingLabelText="Website"
              onChange={this.handleChange('websiteUrl')}
            />
          </div>

          <TextField
            value={company.specialties}
            floatingLabelText="Specialties"
            errorText={validationErrors.specialties}
            onChange={this.handleChange('specialties')}
          />

          <AutoComplete
            onKeyDown={this.disableEnter}
            hintText='Industry'
            searchText={company.industry}
            floatingLabelText='Industry'
            errorText={validationErrors.industry}
            filter={AutoComplete.fuzzyFilter}
            dataSource={IndustryData}
            onNewRequest={this.handleIndustryChange.bind(this)}
            onUpdateInput={this.handleIndustryChange.bind(this)}
            maxSearchResults={5}
          />

        </form>
      </div>
    )
  }
};