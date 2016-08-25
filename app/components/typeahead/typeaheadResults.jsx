import React, { Component, PropTypes } from 'react';

class TypeaheadResults extends Component {
  static propTypes = { 
    results: PropTypes.array,
    selectionUpdate: PropTypes.func.isRequired
  };
  static defaultProps = { results: [] };

  render() {
    return (
      <ul className={'dropdown-menu'}>
        {this.props.results.map((result) => {
          return (
            <li key={result._id} onClick={this.props.selectionUpdate}>{result.name}</li>
          );
        })}
        </ul>
    );

  }
}

export default TypeaheadResults;
