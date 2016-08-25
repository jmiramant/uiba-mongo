import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TypeaheadResults from './TypeaheadResults';

class Typeahead extends Component {
  static defaultProps = { results: []};
  static propTypes = {
    results: PropTypes.array,
    fetchResults: PropTypes.func.isRequired,
    setSelection: PropTypes.func.isRequired,
    selection: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor() {
    super();
  }


  triggerSearch = (e) => {
    if (e.target.value.length > 0) {
      this.props.fetchResults(e.target.value);
    }
    this.props.setSelection(e.target.value);
    this.props.onChange(e.target.value);
  }

  updateSelection (e) {
    this.props.setSelection(e.currentTarget.innerText);
    this.props.onChange(e.currentTarget.innerText);
  }

  render() {
    return (
      <div>
        <input
            type="text"
            placeholder="Search..."
            ref="searchTermInput"
            value={this.props.selection}
            onChange={this.triggerSearch}
        />
          <TypeaheadResults selectionUpdate={this.updateSelection.bind(this)} results={this.props.results} />
      </div>
    );
  }
}

export default Typeahead;