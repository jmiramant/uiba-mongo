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
    this.actions.fetchAddress();
  }  

  handleSave() {
    this.actions.createAddress(this.props.autofill)
  }

  actions = bindActionCreators(actionCreators, this.props.dispatch);
  render() {

    return (
      <AddressAutofill
        error={this.props.error}
        onAddressEdit={this.actions.updateAddress}
        handleChange={this.actions.fetchAddressByZip}
        address={this.props.address} 
        autofill={this.props.autofill}
        deleteAddress={this.actions.deleteAddress}
        handleErrorMsg={this.actions.handleErrorMsg}
        onAddressSave={this.actions.saveByZip}
      />
    );
  }
}

export default AddressAutofillApp;