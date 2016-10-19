import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Address extends Component {
  static defaultProps = { results: [], error: ''};
  
  static propTypes = {
    address: PropTypes.object,
    autofill: PropTypes.object,
    handleChange: PropTypes.func.isRequired, 
    onAddressSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    console.log()
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

  showAddress(autofill) {
    let saveBtn;
    if (!this.props.address.zip_code) {
      saveBtn = (<RaisedButton onClick={this.handleSubmit} label="Save Address" primary={true} />)
    }
    if (autofill.city && autofill.state) {
      return (
        <div>
          <h4>{autofill.city}, {autofill.state}</h4>
          {saveBtn}
        </div>
      )
    } else if (autofill.error_msg){
      return (
        <h4>{autofill.error_msg}</h4>
      )
    }
  }

  showZipEntry() {
    if (!this.props.address.zip_code) {
      return (<TextField
        floatingLabelText="Zip Code"
        onChange={this.handleChange('zipCode')}
      />)
    }
  }

  render() {
    const { 
      autofill 
    } = this.props;

    return (
      <div>
        {this.showZipEntry()}
        {this.showAddress(autofill)}
      </div>
    );
  }
}

export default Address;