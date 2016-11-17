import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CompanyAdd from 'containers/CompanyAdd';
import FlatButton from 'material-ui/FlatButton';
import Loader from 'components/Loader';

import classNames from 'classnames/bind';
import styles from 'css/components/company/companyAdminContainer';
import * as companyActionCreators from 'actions/companies'
import * as profileActionCreators from 'actions/profiles'

const cx = classNames.bind(styles);


class CompanyContainer extends React.Component {

  componentWillMount() {
    this.props.profileActions.fetchProfile();
  }

  componentDidUpdate() {
    const {
      profile,
      company,
      companyActions
    } = this.props;

    if (profile && profile.company_id && company && !company._id) {
      companyActions.fetchCompany(profile.company_id);
    }
  }
  
  render() {

    const {
      profile,
      addShow,
      children,
      company
    } = this.props;

    const companyTag = (
      <div>
        <div>Managing: {company.name}</div>
        {children}
      </div>
    )

    return (
      <div className={cx('companyAdmin-container') + ' container'}>
        <div className={cx('container-card') + ' col-md-12'}>
          { profile.company_id && company._id ? (
            companyTag
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
};

CompanyContainer.propTypes = {
  company: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    company: state.company.company,
    addShow: state.company.addShow,
    profile: state.profile.profile
  };
}

function mapDispatchToProps (dispatch) {
  return {
    companyActions: bindActionCreators(companyActionCreators, dispatch),
    profileActions: bindActionCreators(profileActionCreators, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyContainer);