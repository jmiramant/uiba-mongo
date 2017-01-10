import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/userCard';

const cx = classNames.bind(styles);

class Address extends Component {

  static propTypes = {
    address: PropTypes.array.isRequired,
    autofill: PropTypes.object,
    handleChange: PropTypes.func.isRequired, 
    onAddressSave: PropTypes.func.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    handleErrorMsg: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  state = {
    zip: undefined
  }

  handleChange = field => (e, zip) => {
    this.setState({zip: zip})
  }

  validate() {
    if (_.find(this.props.address, (a) => {return a.zip_code === this.state.zip})) {
      return 'This zip code has already been added.'
    } else if (this.props.address.length >= 2) {
      return 'Only two addresses can be included.'
    }
  }

  handleSubmit() {
    const valid = this.validate()
    if (!valid) {
      this.props.onAddressSave(this.state.zip);
      this.setState({zip: ''});
    } else {
      this.props.handleErrorMsg(valid)
    }
  }  
  
  removeAddress(a) {
    this.props.deleteAddress(a);
  }

  render() {
    
    const { 
      autofill,
      address,
    } = this.props;
    console.log(address.length)
    const showAddress = (autofill, address) => {

      if (autofill.city && autofill.state) {
        return (
          <div>
            <div>{autofill.city}, {autofill.state}</div>
          </div>
        )
      } else if (autofill.error_msg){
        return (
          <h4>{autofill.error_msg}</h4>
        )
      } else if (address.length > 0) {
        return (<div>
        {address.map( (a, i) => {
          return (
            <IconButton 
              key={a._id + i} 
              tooltipStyles={{top: '-5px', left: '40px'}} 
              style={{margin: '3px', display: 'inline-flex', width: 'inherit'}} 
              tooltip={a.zip_code} 
              touch={true} 
              tooltipPosition="top-center"
            >
              <Chip
                onRequestDelete={ () => { this.removeAddress(a) } }
                labelStyle={{fontSize: '11px'}}
                key={a._id + i}
              >{a.city}, {a.state}</Chip>
            </IconButton>
          )
        })}</div>)
      }
    }

    const showZipEntry = () => {
      return (
        <div>
          <TextField
            value={this.state.zip}
            floatingLabelText="Zip Code"
            textareaStyle={{fontSize: '12px'}}
            errorText={this.props.error}
            onChange={this.handleChange()}
          />
          { address.length < 2 ? (
            <div>
              <RaisedButton label="Add Address" labelStyle={{fontSize: '11px'}} onClick={this.handleSubmit.bind(this)}  type="submit" />
            </div>
          ) : (null)}
        </div>
      )
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