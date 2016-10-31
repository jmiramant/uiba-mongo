import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut, fetchCurrentUser } from 'actions/users';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import logoImg from '../images/logo/uiba.png';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

import "css/lib/caretOverrides.less";

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut, currentUser}) => {
    
    const isAdmin = () => {
      if (currentUser.role) {
        return currentUser.role.indexOf(2) !== 0;
      }
    }

    return (
      <nav className={cx('navigation')} role="navigation">
        { user.authenticated ? (
          <Link to="/profile"
            className={cx('item', 'logo')}
            activeClassName={cx('active')}>
              <img className={cx('navbar--header-logo')} src={logoImg} />
          </Link>
        ) : (
          <Link to="/"
            className={cx('item', 'logo')}
            activeClassName={cx('active')}>
              <img className={cx('navbar--header-logo')} src={logoImg} />
          </Link>
        )}

        <div className={cx('nav--items-right') + ' pull-right hidden-xs'}>
          { (isAdmin()) ? ( <Link className={cx('item')} to="/company-admin/dashboard">Admin</Link> ) : (<span />)}

          { user.authenticated ? ( <Link className={cx('item')} to="/profile">Profile</Link> ) : (<span />)}
          <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
          { user.authenticated ? (
            <Link onClick={logOut}
              className={cx('item')} to="/">Logout</Link>
          ) : (
            <Link className={cx('item')} to="/login">Get Started</Link>
          )}
        </div>
        <NavDropdown title='' className={cx('navbar--resp-nav') + ' hidden-sm pull-right hidden-md hidden-lg'} id="responsive-nav-dropdown">
          { (isAdmin()) ? ( 
            <LinkContainer to="/company-admin/dashboard">
              <MenuItem>
                Admin
              </MenuItem>
            </LinkContainer>
          ) : (null)}
          { user.authenticated ? (
            <LinkContainer to="/profile">
              <MenuItem>
                Profile
              </MenuItem>
            </LinkContainer>
          ) : (null)}

          <LinkContainer to="/about">
            <MenuItem>
              About
            </MenuItem>
          </LinkContainer>
          
          { user.authenticated ? (
            <LinkContainer onClick={logOut} to="/#">
              <MenuItem>
                Logout
              </MenuItem>
            </LinkContainer>
          ) : (
            <LinkContainer to="/login">
              <MenuItem>
                Get Started
              </MenuItem>
            </LinkContainer>
          )}

        </NavDropdown>
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    currentUser: state.user.currentUser
  };
}

function mapDispatchToProps (dispatch) {
  return {
    logOut
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);