import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Roles from 'containers/Roles'

import logoImg from '../images/logo/uiba.png';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

const Dashboard = ({ user }) => {
    return (
      <div>
        <Roles />
      </div>
    );
};

Dashboard.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {
})(Dashboard);