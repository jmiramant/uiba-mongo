import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { dismissMessage } from 'actions/messages';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import classNames from 'classnames/bind';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

class Message extends React.Component {
  constructor(props) {
    super(props)
  }
  
  state = {
    autoHide: undefined
  }
  
  autoHide() {
    setTimeout(dismissMessage, 6000)
  }

  componentDidUpdate() {
    this.autoHide();
  }

  render() {
    const {message, dismissMessage, type} = this.props;
    
    return (<div className={cx('message', {
      show: message && message.length > 0,
      success: type === 'SUCCESS',
      error: type === 'ERROR',
    })} onClick={dismissMessage}>{message}
      <CloseIcon 
        className={cx('icon') + ' pull-right'}
      />
    </div>)
  }
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  dismissMessage: PropTypes.func
};

function mapStateToProps(state) {
  return {...state.message.message};
}

export default connect(mapStateToProps, { dismissMessage })(Message);
