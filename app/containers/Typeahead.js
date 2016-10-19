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

  actions = bindActionCreators(actionCreators, this.props.dispatch);
  
  componentDidMount() {
    if (this.props.initial !== "") {
      this.actions.setInitialTypeaheadData(this.props.initial)
    }    
  }

  render() {
    return (
      <TypeAhead
        onChange={this.props.handleChange}
        fetchResults={this.actions.fetchTypeaheadData} 
        setSelection={this.actions.setTypeaheadData} 
        results={this.props.results} 
        selection={this.props.selection}
        error={this.props.error}
      />
    );
  }
}

export default TypeaheadApp;