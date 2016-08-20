import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { LinkContainer } from 'react-router-bootstrap';
import logoImg from '../images/logo/uiba.png';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';
import {NavDropdown, MenuItem} from 'react-bootstrap';

const cx = classNames.bind(styles);
const caretStyle = "\
  .caret {\
    border-top: 10px dashed #2185c5;\
    border-top: 10px solid #2185c5;\
    border-right: 10px solid transparent;\
    border-left: 10px solid transparent;\
  }\
  .dropdown ul.dropdown-menu {\
    margin-top: 29px;\
    right: -55px;\
    border: none;\
    width: 250px;\
    background-color: #FAFAFA;\
    border-radius: 0px;\
  }\
  .dropdown ul.dropdown-menu li {\
    height: 45px;\
  }\
  .dropdown ul.dropdown-menu li a {\
    height: 45px;\
    padding-top: 12px;\
  }\
"

const Navigation = ({ user, logOut }) => {
    
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
          { user.authenticated ? (
            <LinkContainer to="/profile">
              <MenuItem>
                Profile
              </MenuItem>
            </LinkContainer>
          ) : (
            <span />
          )}

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
        <style>{caretStyle}</style>
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
