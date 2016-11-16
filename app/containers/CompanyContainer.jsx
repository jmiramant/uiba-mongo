import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import CompanyAdd from 'containers/CompanyAdd';
import FlatButton from 'material-ui/FlatButton';
import Loader from 'components/Loader';

import classNames from 'classnames/bind';
import styles from 'css/components/company/companyAdminContainer';
import * as companyActionCreators from 'actions/companies'
import { fetchProfile } from 'actions/profiles';

const cx = classNames.bind(styles);


class CompanyContainer extends React.Component {

  componentWillMount() {
    this.props.fetchProfile();
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
        { window.location.pathname !== "/company-admin/dashboard" ? (
          <FlatButton onClick={browserHistory.goBack} label="Back" primary={true} />
        ) : (null)}
        
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
    addShow: state.company.addShow,
    profile: state.profile.profile,
    company: state.company.company
  };
}

function mapDispatchToProps (dispatch) {
  return {
    companyActions: bindActionCreators(companyActionCreators, dispatch),
    fetchProfile: () => {dispatch(fetchProfile())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyContainer);