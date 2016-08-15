import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { LinkContainer } from 'react-router-bootstrap';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    return (

      <nav className={cx('navigation')} role="navigation">
        { user.authenticated ? (
          <Link to="/profile"
            className={cx('item', 'logo')}
            activeClassName={cx('active')}>Uiba
          </Link>
        ) : (
          <Link to="/"
            className={cx('item', 'logo')}
            activeClassName={cx('active')}>Uiba
          </Link>
        )}
        <div className={cx('nav--items-right') + ' pull-right'}>
          { user.authenticated ? ( <Link className={cx('item')} to="/profile">Profile</Link> ) : (<span />)}
          <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
          { user.authenticated ? (
            <Link onClick={logOut}
              className={cx('item')} to="/">Logout</Link>
          ) : (
            <Link className={cx('item')} to="/login">Log in</Link>
          )}
        </div>
      </nav>

    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {
  logOut
})(Navigation);
