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
    this.props.toggleCompanyAdd(this.props.addVisible)
  }

  handleSave = (data) => {
    this.props.onCompanySave(data);
    this.props.toggleCompanyAdd(this.props.addVisible)
  }

  render() {
    const {
      company,
      actions,
      addVisible
    } = this.props;

    return (
      <CompanyAdd 
        company={company}
        onCompanySave={this.handleSave} 
        companyChange={actions.companyChange}
        toggleEdit={this.toggleAddCompany.bind(this)} 
        addVisible={addVisible} 
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    company: state.company.company
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
