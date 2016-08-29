import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/schoolList';
import moment from 'moment';
import LanguageItem from 'components/language/LanguageItem';
import LanguageAdd from 'components/language/LanguageAdd';

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
    let lengthIndex = languages.length - 1;
    const { addVisibile } = this.state;

    return (
      <div className={cx('languageList--container') + ' col-md-5'}>
        {languages.map((language, i) => {
            return (<LanguageItem 
                      key={language._id} 
                      onEditSave={this.handleEditSave} 
                      handleDelete={this.handleDelete}
                      language={language}
                    />)
        })}

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