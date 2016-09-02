import React, { PropTypes } from 'react';

import LanguageAdd from 'components/language/LanguageAdd';

import Chip from 'material-ui/Chip';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/language';
const cx = classNames.bind(styles);

export default class LanguageItem extends React.Component {
  
  static propTypes = {
    language: PropTypes.object.isRequired,
    languageChange: PropTypes.func.isRequired,
    saveLanguageEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  state = {
    edit: false,
  }

  toggleEdit () {
    this.setState({edit: !this.state.edit})
  }

  saveEdit (language) {
    this.props.saveLanguageEdit(language)
    this.toggleEdit()
  }

  handleDelete () {
    this.props.handleDelete(this.props.language)
  }

  render () {
    const { 
            isntLast, 
            language, 
            languageChange
          } = this.props;

    if (this.state.edit) {

      return (
        <LanguageAdd
          language={language}
          languageChange={languageChange}
          onLanguageSave={this.saveEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)}
        />
      )
    
    } else {

      return (
        <div className={cx('chip-container')}>
          <Chip className={cx('languageItem--chip')}>
            {language.language} 
            <span 
              onClick={this.toggleEdit.bind(this)}
              className={cx('languageItem--editBg')}
            >
              <EditIcon
                color='#E0E0E0'
                className={cx('languageItem--editIcon')}
              />
            </span>
          </Chip>
        </div>
      )

    }
  
  }
};