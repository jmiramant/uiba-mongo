import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as companyActionCreator from 'actions/companies'
import CompanyAdd from 'components/company/CompanyAdd';

class CompanyAddApp extends Component {

  constructor(props) {
    super(props);
  }

  toggleAddCompany = () => {
    this.props.actions.toggleCompanyAdd(this.props.addShow)
  }

  handleSave = (data) => {
    
    const {
      actions,
      addShow

    } = this.props;
    
    if (data._id) {
      actions.updateCompany(data);
    } else {
      actions.createCompany(data);
    }

    this.toggleCompanyAdd()
  }

  render() {
    const {
      company,
      actions,
      addShow,
      isExistingData
    } = this.props;

    return (
      <CompanyAdd 
        company={company}
        onCompanySave={this.handleSave} 
        companyChange={actions.companyChange}
        toggleEdit={this.toggleAddCompany.bind(this)} 
        addShow={addShow}
        isExistingData={isExistingData}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    company: state.company.company,
    addShow: state.company.addShow, 
    isExistingData: state.company.isExistingData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(companyActionCreator, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyAddApp);
