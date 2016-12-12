import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LocationRange from 'components/LocationRange';
import * as actionCreators from 'actions/address';

@connect((state) => {
  return {
    zip: state.role.address.zip,
    range: state.role.address.range,
    rangeZips: state.role.address.rangeZips,
    error: state.address.error,
    address: state.address.address,
    autofill: state.address.autofill,
    editMode: state.address.edit,
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
  }  

  handleSave() {
    this.actions.createAddress(this.props.autofill)
  }

  actions = bindActionCreators(actionCreators, this.props.dispatch);

  render() {
    return (
      <LocationRange
        zip={this.props.zip}
        range={this.props.range}
        rangeZips={this.props.rangeZips}
        error={this.props.error}
        setZip={this.actions.setZip}
        address={this.props.address} 
        autofill={this.props.autofill}
        setRange={this.actions.setRange}
        editMode={this.props.editMode}
        editIconMode={this.props.editIconMode}
        onAddressEdit={this.actions.updateAddress}
        setRangeByZip={this.actions.setRangeByZip}
        onAddressSave={this.handleSave.bind(this)}
        showEditIconMode={this.actions.showAddressEditIcon}
        hideEditIconMode={this.actions.hideAddressEditIcon}
        toggleAddressEdit={this.actions.toggleAddressEdit}
      />
    );
  }
}

export default AddressAutofillApp;