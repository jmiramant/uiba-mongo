import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from 'css/components/mouseOverPopup';
const cx = classNames.bind(styles);

class MouseOverPopup extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    const {
      text,
      children
    } = this.props;

    return (
      <span>
        <div className={cx('popup-container')}>
          <p className={cx('text')}>
            {text}
          </p>
        </div>
        {children}
      </span>
    );

  }

};

MouseOverPopup.propTypes = {
  text: PropTypes.string
};


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MouseOverPopup);
