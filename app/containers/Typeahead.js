import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TypeAhead from '../components/typeahead/typeahead';
import * as actionCreators from 'actions/typeahead';

@connect((state) => {
  return {
    results: state.typeahead.typeahead,
    selection: state.typeahead.selection
  }
})

class TypeaheadApp extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    selection: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const actions = bindActionCreators(actionCreators, this.props.dispatch);
    return (
      <TypeAhead
        initial={this.props.initial}
        onChange={this.props.handleChange}
        fetchResults={actions.fetchTypeaheadData} 
        setSelection={actions.setTypeaheadData} 
        results={this.props.results} 
        selection={this.props.selection}
        error={this.props.error}
      />
    );
  }
}

export default TypeaheadApp;