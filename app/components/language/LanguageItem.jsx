import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import styles from 'css/components/profile/jobItem';
import { containsErrors, validateJobFormHelper } from '../helpers/jobFormValidation';
import moment from 'moment';

const cx = classNames.bind(styles);
const intialLanguageState = {
  language: '', 
  proficiency: '',
  lengthOfUse: '',
  frequency: '',
}

const proficiency = [
  {label: 'Elementary Proficiency', value: 'elementary proficiency'},
  {label: 'Limited Working Proficiency', value: 'limited working proficiency'},
  {label: 'Minimum Professional Proficiency', value: 'minimum professional proficiency'},
  {label: 'Full Professional Proficiency', value: 'full professional proficiency'},
  {label: 'Native Or Bilingual Proficiency', value: 'native or bilingual proficiency'}
]; 

export default class LanguageItem extends React.Component {
  
  static propTypes = {
    onEditSave: PropTypes.func,
    handleDelete: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  state = {
    language: { ...this.props.language }, 
    current: this.props.language.current,
    persistedLanguage: { ...this.props.language }, 
    edit: false,
    validate: _.clone(intialLanguageState)
  }

  toggleEdit () {
    if (this.state.edit) {
      this.setState({language: this.state.persistedLanguage})
    }

    this.setState({edit: !this.state.edit})

  }

  saveEdit () {
    if (!this.isDataValid()) {
      this.props.onEditSave(this.state.language)
      this.toggleEdit()
    }
  }

  handleDelete () {
    this.props.handleDelete(this.state.language)
  }

  isDataValid() {
    // const validationResp = validateLanguageFormHelper(_.clone(intialLanguageState), this.state);
    // this.setState({validate: validationResp.error});
    // return containsErrors(validationResp.error)
    return false
  }
  
  handleChange = field => e => {
    
    let value;
    if (e.target) {
      value = e.target.value      
    } else {
      value = e.value
    }

    this.setState({
        language: {
          ...this.state.language,
        [field] : value
        }
    });
  }

  formatDateString(date) {
    return moment(new Date(date)).format('YYYY-MM-DD')
  };


  render () {
    const { isntLast, language } = this.props;
    const { validate } = this.state;

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
        <div className={cx('languageItem--container')}>
          {errorMsgs}

          <input 
            type='text'
            value={this.state.language.language}
            onChange={this.handleChange('language')}
            className={ cx('languageEdit--name')}
            id="type"  />

          <Select
              name="proficiency"
              value="one"
              options={proficiency}
              onChange={this.handleChange('proficiency')}
          />
          
          <input 
            type='text'
            value={this.state.language.experience}
            onChange={this.handleChange('experience')}
            className={ cx('languageEdit--experience')}
            id="experience"  />

          <div className={ cx('languageEdit--controls') }>
            <div className={ cx('languageEdit--buttons') + ' pull-left'} onClick={this.toggleEdit.bind(this)}>Close</div>
            <div className={ cx('languageEdit--buttons', 'languageEdit--button-delete')} onClick={this.handleDelete.bind(this)}>Delete</div>
            <div className={ cx('languageEdit--buttons') + ' pull-right'} onClick={this.saveEdit.bind(this)}>Save</div>
          </div>
          <div className={cx('languageItem--spacer')}></div>
        </div>
      )
    
    } else {

      return (
        <div className={cx('languageItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          <div onClick={this.toggleEdit.bind(this)} className={cx('languageItem--edit')}></div>        
          
          <div>
            <div>Language</div>
            <p className={cx("languageItem--lang")}>{ language.language } </p>
          </div>

          <div>
            <div>Proficiency</div>
            <p className={cx("languageItem--proficiency")}>{ language.proficiency } </p>
          </div>

          <div>
            <div>Experience</div>
            <p className={cx("languageItem--experience")}>{ language.experience } </p>
          </div>

          
          <div className={cx('languageItem--spacer')}></div>
        </div>
      )

    }
  
  }
};