import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

// const old = (
//       <nav className={cx('navigation')} role="navigation">
//         <Link to="/"
//           className={cx('item', 'logo')}
//           activeClassName={cx('active')}>Uiba</Link>
//           { user.authenticated ? ( <Link className={cx('item')} to="/profile">Profile</Link> ) : (<span />)}
//           <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
//           { user.authenticated ? (
//             <Link onClick={logOut}
//               className={cx('item', 'item-right')} to="/">Logout</Link>
//           ) : (
//             <Link className={cx('item', 'item-right')} to="/login">Log in</Link>
//           )}
//       </nav>
// )

const Navigation = ({ user, logOut }) => {
    return (

      <Navbar className={cx('navbar--overwrites')}>
        <Navbar.Header>
          <Link to="/"
            className={cx('logo')}
            activeClassName={cx('active')}>Uiba</Link>
        </Navbar.Header>
        <Nav pullRight>
          { user.authenticated ? ( 
            <LinkContainer to="/profile">
              <NavItem eventKey={1}>Profile</NavItem>
            </LinkContainer>
          ) : (
             <span />
          )}
          <LinkContainer to="/about">
            <NavItem eventKey={1}>About</NavItem>
          </LinkContainer>
           { user.authenticated ? (
            <LinkContainer to="/" onClick={logOut}>
              <NavItem className={cx('item-right')} eventKey={1}>Logout</NavItem>
            </LinkContainer>
           ) : (
            <LinkContainer to="/login">
              <NavItem className={cx('item-right')} eventKey={1}>Log In</NavItem>
            </LinkContainer>
           )}
        </Nav>
      </Navbar>

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
