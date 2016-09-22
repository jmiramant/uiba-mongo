import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import logoImg from '../images/logo/uiba.png';
import classNames from 'classnames/bind';
import styles from 'css/components/footer';

const cx = classNames.bind(styles);

const Footer = ({ user }) => {
    return (
      <nav className={cx('footer')} role="footer">

        { user && user.authenticated ? (
          <Link to="/profile">
              <img className={cx('footer--logo')} src={logoImg} />
          </Link>
        ) : (
          <Link to="/">
            <img className={cx('footer--logo')} src={logoImg} />
          </Link>
        )}


        <Link to='/'></Link>
        <Link className={cx('item') } to="/terms">Terms</Link>
        <Link className={cx('item') } to="/privacy">Privacy</Link>
      </nav>
    )
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {})(Footer);