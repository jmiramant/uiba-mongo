import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/languageList';
import moment from 'moment';
import LanguageItem from 'components/language/LanguageItem';
import LanguageAdd from 'components/language/LanguageAdd';
import NullProfItem from 'components/ProfileNull';

const cx = classNames.bind(styles);

export default class LanguageList extends React.Component {
  
  static propTypes = {
    languages: PropTypes.array,
    onSave: PropTypes.func.isRequired,
    onEditSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = { addVisibile: false } ;
  }
  
  showAddLanguage = () => {
    this.setState({addVisibile: true})
  }

  handleSave = (data) => {
    this.props.onSave(data);
    this.setState({addVisibile: false})
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (language) => {
    this.props.onDelete(language);
  }

  render () {
    let { languages } = this.props;
    const { addVisibile } = this.state;

    const renderItems = (
      <div>
        {languages.map((language, i) => {
          return (<LanguageItem 
                    key={language._id} 
                    onEditSave={this.handleEditSave} 
                    handleDelete={this.handleDelete}
                    language={language}
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
        { this.state.addVisibile ? (
          <LanguageAdd addVisibile={addVisibile} onSave={this.handleSave} />
        ) : (
          <div>
            <div onClick={this.showAddLanguage} className='pull-right'>Add Language</div>
          </div>
        ) }
      </div>
    )
  }
};