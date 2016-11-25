import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import classNames from 'classnames/bind';
import styles from 'css/components/locationRange';

const cx = classNames.bind(styles);

class LocationRange extends Component {

  static propTypes = {
    address: PropTypes.object,
    autofill: PropTypes.object,
    setZip: PropTypes.func.isRequired, 
    setRange: PropTypes.func.isRequired, 
    setRangeByZip: PropTypes.func.isRequired, 
    onAddressSave: PropTypes.func.isRequired,
    toggleAddressEdit: PropTypes.func.isRequired,
    error: PropTypes.string,
    editIconMode: PropTypes.bool,
    hideEditIconMode: PropTypes.func.isRequired,
    showEditIconMode: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  editIconShow() {
    this.props.showEditIconMode()
  }

  editIconHide() {
    this.props.hideEditIconMode()
  }

  toggleEdit = () => {
    this.props.toggleAddressEdit(this.props.editMode)
  }

  setRange(field, val) {
    this.props.setRange(val)
    if (this.props.zip.length > 0) this.props.setRangeByZip(this.props.zip, val)
  }

  handleChange = field => (e, val, pick) => {
    if (field === 'zipCode' && val.length === 5) {
      this.props.setZip(val)
    } else if (field === 'range'){
      this.setRange(field, pick);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddressSave(this.props.autofill);
  }
  
  editSubmit = e => {
    e.preventDefault();
    this.props.onAddressEdit(this.props.autofill);
  }

  render() {
    
    const { 
      autofill,
      address,
      editMode,
      editIconMode
    } = this.props;

    const showAddress = (autofill, address) => {

      let saveBtn, editBtn;
      if (!this.props.address.zip_code) {
        saveBtn = (<RaisedButton onClick={this.handleSubmit} label="Save Address" primary={true} />)
      }
      if (editMode) {
        editBtn = (<RaisedButton onClick={this.editSubmit} label="Update Address" primary={true} />)
      }

      if (autofill.city && autofill.state) {
        return (
          <div
            onDoubleClick={this.toggleEdit.bind(this)} 
            onMouseEnter={this.editIconShow.bind(this)}
            onMouseLeave={this.editIconHide.bind(this)}>
            {editIconMode && !editMode ? (
              <EditIcon
                onClick={this.toggleEdit.bind(this)}
                hoverColor="#f20253"
                className={cx("userCard--edit")}
              />
            ) : (null)}
            <div>{autofill.city}, {autofill.state}</div>
            {saveBtn}
            {editBtn}
          </div>
        )
      } else if (autofill.error_msg){
        return (
          <h4>{autofill.error_msg}</h4>
        )
      } else if (address.city && address.state) {
        return (
          <div 
            onDoubleClick={this.toggleEdit.bind(this)} 
            onMouseEnter={this.editIconShow.bind(this)}
            onMouseLeave={this.editIconHide.bind(this)}
          >
            {editIconMode ? (
              <EditIcon
                onClick={this.toggleEdit.bind(this)}
                hoverColor="#f20253"
                className={cx("userCard--edit")}
              />
            ) : (null)}
            <div>{address.city}, {address.state}</div>
          </div>
        )
      }
    }

    const showZipEntry = () => {
      if (!this.props.address.zip_code || editMode) {
        return (
          <div>
            <TextField
              floatingLabelText="Zip Code"
              errorText={this.props.error}
              onChange={this.handleChange('zipCode')}
            />
            <SelectField
              floatingLabelText="Range"
              onChange={this.handleChange('range')}
            >
              <MenuItem value={5} primaryText="5 Miles" />
              <MenuItem value={10} primaryText="10 Miles" />
              <MenuItem value={25} primaryText="25 Miles" />
              <MenuItem value={50} primaryText="50 Miles" />
            </SelectField>
          </div>
        )
      }
    }

    return (
      <div className={cx('range-container')}>
        {showZipEntry()}
        {showAddress(autofill, address)}
      </div>
    );
  }
}

export default LocationRange;