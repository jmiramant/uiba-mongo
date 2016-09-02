import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as languagesActionCreators from 'actions/languages';

import LanguageItem from 'components/language/LanguageItem';
import LanguageAdd from 'components/language/LanguageAdd';
import NullProfItem from 'components/ProfileNull';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/languageList';
import moment from 'moment';
const cx = classNames.bind(styles);

class LanguageList extends React.Component {
  
  static propTypes = {
    languages: PropTypes.array,
    addVisibile: PropTypes.bool.isRequired,
    onEditSave: PropTypes.func.isRequired,
    toggleLanguageAdd: PropTypes.func.isRequired,
    onLanguageSave: PropTypes.func.isRequired,
    onLanguageDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }
  
  toggleAddLanguage = () => {
    this.props.toggleLanguageAdd(this.props.addVisibile)
  }
  
  handleSave = (data) => {
    this.props.onLanguageSave(data);
    this.props.toggleLanguageAdd(this.props.addVisibile)
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (language) => {
    this.props.onLanguageDelete(language);
  }

  render () {
    let { language,
          languages,
          addVisibile,
          actions
        } = this.props;
    let lengthIndex = languages.length - 1;
    const renderItems = (
      <div>
        {languages.map((language, i) => {
          return (<LanguageItem 
                    key={language._id} 
                    language={language}
                    languageChange={actions.languagesChange}
                    saveLanguageEdit={this.handleEditSave} 
                    handleDelete={this.handleDelete}
                  />)
        })}
      </div>
    )

    return (
      <div className={cx('languageList--container') + ' col-md-8 col-md-offset-2'}>
        { languages.length ? (
          <div>
            {renderItems}
          </div>
        ) : (
          <span>
            <NullProfItem target="language" />
          </span>
        )}
        { addVisibile ? (
          <LanguageAdd
            language={language}
            languageChange={actions.languageChange}
            toggleEdit={this.toggleAddLanguage.bind(this)} 
            addVisibile={addVisibile}
            onLanguageSave={this.handleSave}
          />
        ) : (
          <div>
            <FloatingActionButton 
              onClick={this.toggleAddLanguage}
              className={cx('languageItem--add') + ' pull-right'}
              mini={true}
            >
              <AddIcon />
            </FloatingActionButton>
          </div>
        ) }
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