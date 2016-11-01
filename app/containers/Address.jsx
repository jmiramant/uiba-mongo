import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddressAutofill from '../components/Address';
import * as actionCreators from 'actions/address';

@connect((state) => {
  return {
    autofill: state.address.autofill,
    address: state.address.address,
    editMode: state.address.edit,
    error: state.address.error,
    editIconMode: state.address.editIcon
  }
})

class AddressAutofillApp extends Component {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.type === 'company') {
      this.actions.fetchCompanyAddress({name: this.props.name.toLowerCase()})
    } else {
      this.actions.fetchAddress()
    }
  }  

  handleSave() {
    this.actions.createAddress(this.props.autofill)
  }

  actions = bindActionCreators(actionCreators, this.props.dispatch);

  render() {
    return (
      <AddressAutofill
        error={this.props.error}
        editMode={this.props.editMode}
        editIconMode={this.props.editIconMode}
        showEditIconMode={this.actions.showAddressEditIcon}
        hideEditIconMode={this.actions.hideAddressEditIcon}
        onAddressEdit={this.actions.updateAddress}
        toggleAddressEdit={this.actions.toggleAddressEdit}
        handleChange={this.actions.fetchAddressByZip}
        address={this.props.address} 
        autofill={this.props.autofill}
        onAddressSave={this.handleSave.bind(this)}
      />
    );
  }
}

export default AddressAutofillApp;