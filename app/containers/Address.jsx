import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddressAutofill from '../components/Address';
import * as actionCreators from 'actions/address';

@connect((state) => {
  return {
    autofill: state.address.autofill,
    address: state.address.address
  }
})

class AddressAutofillApp extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  handleSave() {
    this.actions.createAddress(this.props.autofill)
  }

  actions = bindActionCreators(actionCreators, this.props.dispatch);

  render() {
    return (
      <AddressAutofill
        handleChange={this.actions.fetchAddressByZip}
        address={this.props.address} 
        autofill={this.props.autofill}
        onAddressSave={this.handleSave.bind(this)}
      />
    );
  }
}

export default AddressAutofillApp;