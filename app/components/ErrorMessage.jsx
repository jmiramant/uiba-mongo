import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as messageActionCreator from 'actions/messages';

import classNames from 'classnames/bind';
import styles from 'css/components/errorMessage';
const cx = classNames.bind(styles);

class ErrorMessage extends React.Component {

  constructor(props) {
    super(props)
  }

  shouldShow() {
    return (this.props.errorText && this.props.errorText.length > 0 )
  }

  render() {

    const {
      errorText,
      messageActions
    } = this.props;

    if (this.shouldShow()) {
      setTimeout(messageActions.dismissError, 6000);
    }

    return (
      <span>
        { (errorText && errorText.length > 0) ? 
          (
            <h4 className={cx('msg')}>{errorText}</h4>  
          ) : (
            null
          )
        }
      </span>
    );

  }

};

ErrorMessage.propTypes = {
  errorText: PropTypes.string
};


function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps (dispatch) {
  return {
    messageActions: bindActionCreators(messageActionCreator, dispatch),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
