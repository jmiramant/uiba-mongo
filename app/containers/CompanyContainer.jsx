import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CompanyAdd from 'containers/CompanyAdd';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';
import * as companyActionCreator from 'actions/companies'

const cx = classNames.bind(styles);


class CompanyContainer extends React.Component {

  componentWillMount() {
    this.props.companyActions.fetchCompany();
  }
  
  render() {
    const {
      children,
      company,
      companyActions
    } = this.props;

    const isCompany = (company) => { 
      return Object.keys(company).length > 0
    };

    return (
      <nav className={cx('navigation')} role="navigation">
        {isCompany(company) ? (
          children
        ) : (
          <CompanyAdd
            addVisible={true}
          />
        )}
      </nav>
    );
  }
};

CompanyContainer.propTypes = {
  company: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    company: state.company.company
  };
}

function mapDispatchToProps (dispatch) {
  return {
    companyActions: bindActionCreators(companyActionCreator, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyContainer);