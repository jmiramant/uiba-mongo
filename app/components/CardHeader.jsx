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
    addVisible: PropTypes.bool,
    toggleAdd: PropTypes.func,
    style: PropTypes.string
    error: PropTypes.string
  }

  toggleAdd = () => {
    this.props.toggleAdd(this.props.addVisible)
  }
  
  render () {
    const { 
      text,
      style,
      error,
      toggleAdd,
      addVisible,
    } = this.props;

    const styleClass = style ? style : ''

    return (
      <header className={cx('cardHeader--container', styleClass)}>
        <h3 className={cx('text')}>{text}</h3>
        {toggleAdd ? (
          <span>
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
        </span>
        ) : (null) }
        { error ? (<div><div className={cx('error-container')}><div className={cx('error-text')}>{error}</div></div></div>) : (null) }
      </header>
    )
  }
};