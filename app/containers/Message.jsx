import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as messageActionCreator from 'actions/messages';
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
    const t = setTimeout( (a) => {
      this.props.actions.dismissMessage();
    }, 5000);
    this.setState({autoHide: t})
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.autoHide) {
      clearTimeout(this.state.autoHide);
      this.setState({autoHide: undefined});
    }
    
    if (nextProps.message && nextProps.message.length > 0) this.autoHide();

  }

  render() {
    const {message, actions, type} = this.props;
    
    return (<div className={cx('message', {
      show: message && message.length > 0,
      success: type === 'SUCCESS',
      error: type === 'ERROR',
    })} onClick={actions.dismissMessage}>{message}
      <CloseIcon 
        className={cx('icon') + ' pull-right'}
      />
    </div>)
  }
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

function mapStateToProps(state) {
  return {...state.message.message};
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(messageActionCreator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
