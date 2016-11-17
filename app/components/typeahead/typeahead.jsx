import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from 'material-ui/AutoComplete';

class Typeahead extends Component {
  static defaultProps = { results: [], error: ''};
  
  static propTypes = {
    results: PropTypes.array,
    fetchResults: PropTypes.func.isRequired,
    setSelection: PropTypes.func.isRequired,
    selection: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    error: PropTypes.string,
    label: PropTypes.string,
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
    if (value.length > 1) {
      this.props.fetchResults(value);
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <AutoComplete
        searchText={this.props.selection}
        errorText={this.props.error}
        filter={AutoComplete.caseInsensitiveFilter}
        floatingLabelText={this.props.label}
        dataSource={this.state.results}
        onUpdateInput={this.triggerSearch}
        onNewRequest={this.props.onSelect}
      />
    );
  }
}

export default Typeahead;