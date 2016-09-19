import React, { PropTypes } from 'react';

import { validateLanguageHelper } from '../helpers/languageValidations';
import languageData from './LanguageData';

import UibaSlider from '../UibaSlider';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';
import _ from 'lodash';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/language';
const cx = classNames.bind(styles);

const LangData = languageData();
let timeout;

export default class LanguageAdd extends React.Component {

  static propTypes = {
    isEdit: PropTypes.bool.isRequired, 
    language: PropTypes.object.isRequired,
    languageChange: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    addVisible: PropTypes.bool,
    onLanguageSave: PropTypes.func.isRequired
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
      this.props.onLanguageSave(this.props.language);
    }
  }
  
  validate() {
    const validationResp = validateLanguageHelper(this.props.language, this.state.validationErrors);
    this.setState({validationErrors: validationResp.errors});
    return validationResp.containsErrors;
  }

  changeLanguageProps(field, value) {
    this.props.languageChange({
      field: field,
      value: value,
      id: this.props.language._id
    });
  }

  handleExpand(next) {
    if (this.props.language.language !== next) {
      if(timeout) { clearTimeout(timeout); }
      timeout = setTimeout(() => {
        !this.props.addVisible && this.props.language.language ? this.props.toggleEdit() : null
      }, 500)
    } 
  }

  handleLanguage (value) {
    if (!this.props.addVisible) {
      this.handleExpand(value) 
    }
    this.changeLanguageProps('language', value);
  }
  
  sliderChange(field, value) {
    this.changeLanguageProps(field, value)
  }

  handleChange = field => (e, i, uiVal) => {
    let value;
    if (uiVal) {
      value = uiVal
    } else {
      value = e.target.value
    }

    if (field === 'proficiency' && value === 'native or bilingual proficiency') {
      this.changeLanguageProps('experience', '');
    }
    this.changeLanguageProps(field, value);
  }

  render () {
    const {
            validationErrors
          } = this.state;

    const {
            language,
            addVisible,
            isEdit
          } = this.props;
    
    let langaugeText = 'Add a Language';
    if (isEdit) langaugeText = 'Language';

    return (
      <div>
        <form
          className={cx('languageAdd--form')}
          onSubmit={this.handleSubmit}
        >
          <AutoComplete
            searchText={language.language}
            floatingLabelText="Language"
            errorText={validationErrors.language}
            filter={AutoComplete.fuzzyFilter}
            dataSource={LangData}
            onNewRequest={this.handleLanguage.bind(this)}
            onUpdateInput={this.handleLanguage.bind(this)}
            maxSearchResults={5}
          />

          { addVisible || isEdit ? (
            <span>

              <UibaSlider
                dataSource={language}
                errorText={validationErrors.proficiency}
                title="Proficiency"
                field={'proficiency'}
                handleChange={this.sliderChange.bind(this)}
                storeValue={['elementary proficiency', 'limited working proficiency', 'minimum professional proficiency', 'native or bilingual proficiency']}
                stages={['elementary', 'limited working', 'minimum professional', 'native or bilingual']}
              />
          
              { language.proficiency !== 'native or bilingual proficiency' ? (
                <UibaSlider
                  dataSource={language}
                  errorText={validationErrors.experience}
                  title="Experience (in years)"
                  field={'experience'}
                  handleChange={this.sliderChange.bind(this)}
                  style={{width: '90%'}}
                  storeValue={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  stages={['>1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']}
                />
              ) : (null)}
          
              <div className={cx('profile-btn-group')}>
                <FlatButton className='pull-right' type="submit" label="Save" primary={true} />
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