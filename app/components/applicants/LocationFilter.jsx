import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import classNames from 'classnames/bind';
import styles from 'css/components/locationRange';

const cx = classNames.bind(styles);

class LocationFilter extends Component {

  static propTypes = {
    zip: PropTypes.number,
    error: PropTypes.string,
    setZip: PropTypes.func.isRequired, 
    rangeZips: PropTypes.array,
    setRange: PropTypes.func.isRequired, 
    editIconMode: PropTypes.bool,
    setRangeByZip: PropTypes.func.isRequired, 
    onAddressSave: PropTypes.func.isRequired,
    hideEditIconMode: PropTypes.func.isRequired,
    showEditIconMode: PropTypes.func.isRequired,
    toggleAddressEdit: PropTypes.func.isRequired,
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
      zip,
      range,
      address,
      autofill,
      editMode,
      rangeZips,
      editIconMode
    } = this.props;

    const showAddress = (autofill, zip) => {
      return (
        <div 
          onMouseEnter={this.editIconShow.bind(this)}
          onMouseLeave={this.editIconHide.bind(this)}
        >
          {editIconMode ? (
            <EditIcon
              onClick={this.toggleEdit.bind(this)}
              hoverColor="#f20253"
              style={{margin: '25px 25px 0 0', float: 'right'}}
              className={cx("userCard--edit")}
            />
          ) : (null)}
          <div className={cx('set-range')}>{zip} including {range} miles.</div>
        </div>
      )
    }

    const showZipEntry = () => {
      return (
        <div>
          <TextField
            floatingLabelText="Zip Code"
            errorText={this.props.error}
            onChange={this.handleChange('zipCode')}
          />
          <SelectField
            floatingLabelText="Range"
            value={this.props.range}
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

    return (
      <div className={cx('range-container')}>
      {(rangeZips.length === 0 || editMode) ? (
        showZipEntry()
      ) : (
        showAddress(autofill, zip)
      )}

      </div>
    );
  }
}

export default LocationFilter;