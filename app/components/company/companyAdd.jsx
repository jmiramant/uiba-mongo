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
    isExistingData: PropTypes.bool,
    onCompanySave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  state = {
    validationErrors: {},
    isCompanySet: false,
    uploaderProgress: null
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
    if (typeof(val) === 'string') {
      this.changeCompanyProps('name', val)  
    } 
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

  uploaderFinish(resp) {
    this.changeCompanyProps('logoUrl', 'https://uiba-test.s3.amazonaws.com/' + resp.filename)
  }

  uploaderProgress(progress) {
    this.setState({uploaderProgress: progress})
  }


  render () {
    const {
            validationErrors
          } = this.state;

    const {
            company,
            addVisible,
            isExistingData,
          } = this.props;

    const isVisible = addVisible ? '' : ' ' + cx('closed');
    
    const style = {
      height: 125,
      width: 125,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative',
      cursor: 'pointer',
      margin: '0px auto'
    }

    const uploaderProps = {
      style,
    }

    const logoUploader = (
      <DropzoneS3Uploader
        uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
        s3Url={'https://uiba-test.s3.amazonaws.com'}
        accept={"image/*"}
        signingUrl={"/s3/sign"}
        contentDisposition={"auto"}
        onProgress={this.uploaderProgress.bind(this)}
        onFinish={this.uploaderFinish.bind(this)}
        {...uploaderProps}
      >
        <div className={cx('upload-text')}>
          {this.state.uploaderProgress ? (
            this.state.uploaderProgress + '%'
          ) : (
            'Drop or click to upload Company Logo.'
          )}
        </div>
      </DropzoneS3Uploader>
    )

    const addExpanded = (
      <div>
        <div className="col-md-6">
          <TextField
            value={company.description}
            errorText={validationErrors.description}
            floatingLabelText="Description"
            onChange={this.handleChange('description')}
          />
        </div>

        <div className="col-md-6">
          <UibaDatePicker
            data={company.foundedDate}
            name='founded'
            onDateChange={this.handleDateChange}
            validationErrors={validationErrors}
          />
        </div>

        <div className="col-md-6">
          <SelectField
            errorText={validationErrors.size}
            onChange={this.handleSize}
            value={company.size}
            floatingLabelText="Company Size"
            hintText='Company Size'
          >
            <MenuItem value={10} primaryText="1-10" />
            <MenuItem value={20} primaryText="11-20" />
            <MenuItem value={50} primaryText="21-50" />
            <MenuItem value={100} primaryText="51-100" />
            <MenuItem value={250} primaryText="101-250" />
            <MenuItem value={500} primaryText="251-500" />
            <MenuItem value={501} primaryText=">500" />
          </SelectField>
        </div>
        <div className="col-md-6">
          <TextField
            value={company.websiteUrl}
            errorText={validationErrors.websiteUrl}
            floatingLabelText="Website"
            onChange={this.handleChange('websiteUrl')}
          />
        </div>

        <div className="col-md-6">
          <TextField
            value={company.specialties}
            floatingLabelText="Specialties (Separate by Comma)"
            errorText={validationErrors.specialties}
            onChange={this.handleChange('specialties')}
          />
        </div>

        <div className="col-md-6">
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
        </div>
      </div>
    )

   
    return (
      <div className={cx('companyAdd-container') + isVisible}>
        <form>
          
          <div className={cx("logo-container")}>
            {company.logoUrl ? (
              <div style={{backgroundImage: 'url(' + company.logoUrl + ')'}} className={cx("company-logo")}/>
            ) : (logoUploader)}
          </div>

          <div className="col-md-12">
            <CompanyNameTypeahead 
              selection={company.name}
              initial={company.name}
              error={validationErrors.name}
              handleChange={this.handleName.bind(this)}
            />

          </div>

          {isExistingData ? (null) : (addExpanded)}

          <div className={cx('btn-group-container')}>
            <div className={cx('btn-group')}>
              <RaisedButton className='text-center' onClick={this.handleSubmit} label={isExistingData ? ('Confirm') : ('Save')} primary={true} />
            </div>
          </div>

        </form>
      </div>
    )
  }
};