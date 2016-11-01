import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CompanyAdd from 'containers/CompanyAdd';

import classNames from 'classnames/bind';
import styles from 'css/components/company/companyAdminContainer';
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
      addShow,
      companyActions
    } = this.props;

    return (
      <div className={cx('companyAdmin-container') + ' container'}>
        <div className={cx('container-card') + ' col-md-12'}>
          {addShow ? (
            <CompanyAdd
              addVisible={addShow}
            />
          ) : (
           children
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
    addShow: state.company.addShow
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