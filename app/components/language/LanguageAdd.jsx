import React, { PropTypes } from 'react';

import { validateLanguageHelper } from '../helpers/languageValidations';

import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';
import _ from 'lodash';


import classNames from 'classnames/bind';
import styles from 'css/components/profile/language';
const cx = classNames.bind(styles);

const LangData = [ 
  'Mandarin','Spanish','English','Hindi','Arabic','Portuguese','Bengali','Russian','Japanese','Punjabi','German','Javanese','Malaysian','Telugu','Vietnamese','Korean',
  'French','Marathi','Tamil','Urdu','Turkish','Italian','Yue','Thai','Gujarati','Jin','Persian','Polish','Pashto','Kannada','Xiang','Malayalam','Sundanese','Hausa','Odia',
  'Burmese','Hakka','Ukrainian','Bhojpuri','Tagalog','Yoruba','Maithili','Uzbek','Sindhi','Amharic','Fula','Romanian','Oromo','Igbo','Azerbaijani','Awadhi','Dutch','Kurdish',
  'Malagasy','Saraiki','Nepali','Sinhalese','Chittagonian','Zhuang','Khmer','Turkmen','Assamese','Madurese','Somali','Marwari','Magahi','Haryanvi','Hungarian','Chhattisgarhi',
  'Greek','Chewa','Deccan','Akan','Kazakh','Northern','Sylheti','Zulu','Czech','Kinyarwanda','Dhundhari','Haitian','Eastern','Ilocano','Quechua','Kirundi','Swedish','Hmong','Shona',
  'Uyghur','Hiligaynon','Mossi','Xhosa','Belarusian','Balochi','Konkani'
]

export default class LanguageAdd extends React.Component {

  static propTypes = {
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

  handleLanguage (value) {
    this.props.languageChange({
      field: 'language',
      value: value,
      id: this.props.language._id
    });  
  }

  handleChange = field => (e, i, uiVal) => {
    let value;
    if (uiVal) {
      value = uiVal
    } else {
      value = e.target.value
    }

    this.props.languageChange({
      field: field,
      value: value,
      id: this.props.language._id
    });  
  }

  render () {
    const {
            validationErrors
          } = this.state;

    const {
            language,
          } = this.props;


    return (
      <div>
        <form
          className={cx('languageAdd--form')}
          onSubmit={this.handleSubmit}
        >
          <AutoComplete
            value={language.language}
            floatingLabelText="Language"
            errorText={validationErrors.language}
            filter={AutoComplete.fuzzyFilter}
            dataSource={LangData}
            onNewRequest={this.handleLanguage.bind(this)}
            onUpdateInput={this.handleLanguage.bind(this)}
            maxSearchResults={5}
          />

          <SelectField
            errorText={validationErrors.proficiency}
            onChange={this.handleChange('proficiency')}
            value={language.proficiency}
            floatingLabelText="Proficiency"
            hintText='Proficiency'
          >
            <MenuItem value={'elementary proficiency'} primaryText="Elementary Proficiency" />
            <MenuItem value={'limited working proficiency'} primaryText="Limited Working Proficiency" />
            <MenuItem value={'minimum professional proficiency'} primaryText="Minimum Professional Proficiency" />
            <MenuItem value={'native or bilingual proficiency'} primaryText="Native Or Bilingual Proficiency" />
          </SelectField>
          
          <TextField
            value={language.experience}
            errorText={validationErrors.experience}
            floatingLabelText="Experience"
            hintText='Enter in years'
            onChange={this.handleChange('experience')}
          />

          <div className={cx('profile-btn-group')}>
            <RaisedButton className='pull-right' type="submit" label="Save" primary={true} />
            {this.props.handleDelete ? (
              <FlatButton className='pull-left' label="Delete" onClick={this.props.handleDelete} primary={true} />
            ) : (<span />)}
            <FlatButton className='pull-left' label="Close" onClick={this.props.toggleEdit} primary={true} />
          </div>

        </form>
      </div>
    )
  }
};