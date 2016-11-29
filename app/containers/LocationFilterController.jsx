import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LocationFilter from 'components/applicants/LocationFilter';
import * as actionCreators from 'actions/address';

@connect((state) => {
  return {
    zip: state.address.zip,
    range: state.address.range,
    rangeZips: state.address.rangeZips,
    error: state.address.error,
    address: state.address.address,
    autofill: state.address.autofill,
    editMode: state.address.edit,
    editIconMode: state.address.editIcon
  }
})

class LocationFilterController extends Component {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string
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
      <LocationFilter
        zip={this.props.zip}
        range={this.props.range}
        rangeZips={this.props.rangeZips}
        error={this.props.error}
        setZip={this.actions.setZip}
        editMode={this.props.editMode}
        setRange={this.actions.setRange}
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

export default LocationFilterController;