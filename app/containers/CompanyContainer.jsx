import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CompanyAdd from 'containers/CompanyAdd';

import classNames from 'classnames/bind';
import styles from 'css/components/company/companyAdminContainer';
import * as companyActionCreators from 'actions/companies'
import { fetchProfile } from 'actions/profiles';

const cx = classNames.bind(styles);


class CompanyContainer extends React.Component {

  componentWillMount() {
    this.props.companyActions.fetchCompany();
    this.props.fetchProfile();
  }
  
  render() {

    const {
      addShow,
      children,
    } = this.props;

    const setupCompany = (
      <div>
        
        <p>You have successfully logged in to the Company Adminstrators Portal. Please begin by completing a company profile.</p>
        
        <CompanyAdd/>

      </div>
    )

    return (
      <div className={cx('companyAdmin-container') + ' container'}>
        <div className={cx('container-card') + ' col-md-12'}>
          {addShow ? (setupCompany) : (children)}
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