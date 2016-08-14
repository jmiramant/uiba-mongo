import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';
import styles from 'css/components/footer';

const cx = classNames.bind(styles);

const Footer = ({ user, logOut }) => {
    return (
      <nav className={cx('footer')} role="footer">
        <Link className={cx('item') } to="/terms">Terms</Link>
        <Link className={cx('item') } to="/privacy">Privacy</Link>
      </nav>
    )
};

export default Footer;