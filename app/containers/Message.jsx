import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import { dismissMessage } from 'actions/messages';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {message, dismissMessage, type} = this.props;
    
    setTimeout(dismissMessage, 6000)
    
    return (<div className={cx('message', {
      show: message && message.length > 0,
      success: type === 'SUCCESS'
    })} onClick={dismissMessage}>{message}
    </div>)
  }
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  dismissMessage: PropTypes.func
};

function mapStateToProps(state) {
  return {...state.message};
}

export default connect(mapStateToProps, { dismissMessage })(Message);
