import React, { PropTypes } from 'react';

import AddIcon from 'material-ui/svg-icons/content/add';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/cardHeader';
import moment from 'moment';

const cx = classNames.bind(styles);

export default class CardHeader extends React.Component {
  
  static propTypes = {
    text: PropTypes.string.isRequired,
    addVisible: PropTypes.bool.isRequired,
    toggleAdd: PropTypes.func.isRequired,
  }

  toggleAdd = () => {
    this.props.toggleAdd(this.props.addVisible)
  }
  
  render () {
    const { 
            text,
            addVisible,
          } = this.props;
    return (
      <header className={cx('cardHeader--container')}>
        <h3 className={cx('text')}>{text}</h3>
        
        { addVisible ? (
          <CloseIcon 
            className={cx('icon') + ' pull-right'}
            onClick={this.toggleAdd}
          />
        ): (
          <AddIcon 
            className={cx('icon') + ' pull-right'}
            onClick={this.toggleAdd}
          />
        )}

      </header>
    )
  }
};