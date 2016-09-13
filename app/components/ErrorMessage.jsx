import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dismissError } from 'actions/skills';

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
      dismissError
    } = this.props;

    if (this.shouldShow()) {
      setTimeout(dismissError, 6000);
    }

    return (
      <span>
        { (this.shouldShow()) ? 
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

export default connect(mapStateToProps, { dismissError })(ErrorMessage);
