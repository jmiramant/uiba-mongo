import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/userCard';

const cx = classNames.bind(styles);

class Address extends Component {

  static propTypes = {
    address: PropTypes.object,
    autofill: PropTypes.object,
    handleChange: PropTypes.func.isRequired, 
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

  handleChange = field => (e, zip) => {
    if (zip.length === 5) {
      this.props.handleChange(zip);
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
        return (<TextField
          floatingLabelText="Zip Code"
          errorText={this.props.error}
          onChange={this.handleChange('zipCode')}
        />)
      }
    }

    return (
      <div>
        {showZipEntry()}
        {showAddress(autofill, address)}
      </div>
    );
  }
}

export default Address;