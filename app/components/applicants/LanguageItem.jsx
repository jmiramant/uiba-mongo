import React, { PropTypes } from 'react';

import Chip from 'material-ui/Chip';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/language';
const cx = classNames.bind(styles);

export default class LanguageItem extends React.Component {
  
  static propTypes = {
    language: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render () {
    const { 
      language, 
    } = this.props;

    return (
      <div className={cx('chip-container')}>
        <Chip className={cx('languageItem--chip')}>
          {language.language} 
        </Chip>
      </div>
    )
  
  }
};