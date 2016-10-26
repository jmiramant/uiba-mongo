import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/applyBtn';

import RaisedButton from 'material-ui/RaisedButton';

const cx = classNames.bind(styles);

export default class ApplyBtn extends React.Component {
  
  static propTypes = {
    applyState: PropTypes.object,
    handleSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  render () {

    const {
      applyState: {applyComplete, applied},
      handleSubmit, 
    } = this.props;

    const label = applyComplete ? 'Resubmit' : 'Submit'
    return (
      <div className={cx('apply-btn-group')}>
        <RaisedButton className={cx('back-btn')} label={label + " Application"} onClick={handleSubmit} primary={true} />
      </div>
    )

  
  }
};