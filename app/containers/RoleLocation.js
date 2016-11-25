import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LocationRange from '../components/LocationRange';
import * as actionCreators from 'actions/address';

@connect((state) => {
  return {
    autofill: state.address.autofill,
    address: state.address.address,
    zip: state.address.zip,
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
      <LocationRange
        error={this.props.error}
        editMode={this.props.editMode}
        editIconMode={this.props.editIconMode}
        showEditIconMode={this.actions.showAddressEditIcon}
        hideEditIconMode={this.actions.hideAddressEditIcon}
        onAddressEdit={this.actions.updateAddress}
        toggleAddressEdit={this.actions.toggleAddressEdit}
        setZip={this.actions.setZip}
        setRange={this.actions.setRange}
        setRangeByZip={this.actions.setRangeByZip}
        address={this.props.address} 
        zip={this.props.zip}
        autofill={this.props.autofill}
        onAddressSave={this.handleSave.bind(this)}
      />
    );
  }
}

export default AddressAutofillApp;