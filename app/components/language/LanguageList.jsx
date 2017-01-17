import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as languagesActionCreators from 'actions/languages';

import LanguageItem from 'components/language/LanguageItem';
import LanguageAdd from 'components/language/LanguageAdd';
import NullProfItem from 'components/ProfileNull';
import ErrorMessage from 'components/ErrorMessage';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/languageList';
import moment from 'moment';
const cx = classNames.bind(styles);

class LanguageList extends React.Component {
  
  static propTypes = {
    languages: PropTypes.array,
    addVisible: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    onEditSave: PropTypes.func.isRequired,
    toggleLanguageAdd: PropTypes.func.isRequired,
    toggleLanguageEdit: PropTypes.func.isRequired,
    onLanguageSave: PropTypes.func.isRequired,
    onLanguageDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }
  
  toggleAddLanguage = () => {
    const {
      addVisible,
      language,
      toggleLanguageAdd
    } = this.props

    toggleLanguageAdd(addVisible, language)
  }

  toggleEditLanguage(language) {
    const {
      toggleLanguageEdit
    } = this.props

    toggleLanguageEdit(language)
  }
  
  handleSave = (data) => {
    const {
      addVisible,
      language,
      toggleLanguageAdd,
      onLanguageSave
    } = this.props

    onLanguageSave(data);
    toggleLanguageAdd(addVisible, language)
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (language) => {
    this.props.onLanguageDelete(language);
  }

  render () {
    const { language,
          languages,
          addVisible,
          actions,
          errorMessage,
        } = this.props;

    const lengthIndex = languages.length - 1;

    const listClass = classNames({
      [cx('horizontal')]: true,
      [cx('left')]: true,
      [cx('split')]: addVisible,
    });

    const addClass = classNames({
      [cx('horizontal')]: true,
      [cx('left-border')]: addVisible,
      [cx('no-items')]: languages.length === 0,
      [cx('right')]: true,
      [cx('split')]: addVisible,
    });

    const renderItems = (
      <div>
        {languages.map((language, i) => {
          return (<LanguageItem 
                    key={language._id} 
                    language={language}
                    languageChange={actions.languagesChange}
                    toggleEdit={this.toggleEditLanguage.bind(this)}
                    saveLanguageEdit={this.handleEditSave} 
                    handleDelete={this.handleDelete}
                  />)
        })}
      </div>
    )

    return (
      <div className={cx('languageList--bootstrap-container')}>
        <div className={cx('languageList--container')}>

          <div className={cx('cta')}>
            <p className={cx('cta-msg')}>Please include any languages you speak, read, or write.</p>
          </div>

          { languages.length ? (
            <div className={listClass}>
              {renderItems}
            </div>
          ) : (
            <span>
              <NullProfItem target="language" />
            </span>
          )}
          <div className={addClass}>
            <ErrorMessage 
              errorText={errorMessage}
            />
            <LanguageAdd
              isEdit={false}
              language={language}
              languageChange={actions.languageChange}
              toggleEdit={this.toggleAddLanguage.bind(this)} 
              addVisible={addVisible}
              onLanguageSave={this.handleSave}
            />

          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    language: state.language.language
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(languagesActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageList);