import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from 'material-ui/AutoComplete';

class Typeahead extends Component {
  static defaultProps = { results: [], error: ''};
  
  static propTypes = {
    results: PropTypes.array,
    fetchResults: PropTypes.func.isRequired,
    setSelection: PropTypes.func.isRequired,
    selection: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }
  
  state = {
    results: [] 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({results: nextProps.results.map((i) => {return i.name})})
  }

  triggerSearch = (value) => {
    this.props.fetchResults(value);
    this.props.onChange(value);
  }

  onMenuSelect = (value) => {
    this.props.onChange(value);
  }

  render() {
    return (
      <div>
        <AutoComplete
          errorText={this.props.error}
          filter={AutoComplete.caseInsensitiveFilter}
          floatingLabelText="Enter school name"
          dataSource={this.state.results}
          onUpdateInput={this.triggerSearch}
          onNewRequest={this.onMenuSelect}
        />
      </div>
    );
  }
}

export default Typeahead;