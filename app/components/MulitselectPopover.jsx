import React, { PropTypes } from 'react';

import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableFooter, TableRow, TableRowColumn}
  from 'material-ui/Table';

import classNames from 'classnames/bind';
import styles from 'css/components/errorMessage';
const cx = classNames.bind(styles);

class MulitselectPopover extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      open: false,
    };
  }

  buildTableData(){
    const { data, selectd } = this.props;
    return data.map( (dItem) => {
      let selected = false;
      if (selected) selected = (selected.indexOf(dItem) !== -1);  
      return {name: dItem, selected}
    })
  }
  
  openMultiSelect = (e) => {
    e.preventDefault();

    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  };

  closePopover () {
    this.setState({open: false});
  }

  asd () {
    debugger
  }

  render() {

    const {
      target,
      percent,
      buttonText
    } = this.props;

    const tableData = this.buildTableData();

    return (
      <div>
        <RaisedButton
          onClick={this.openMultiSelect}
          label={buttonText}
        />
        <Popover
          open={this.state.open}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
          anchorEl={this.state.anchorEl}
          style={{height: '300', width: '300'}}
        >
        <Table
            height='240px'
            onChange={this.asd}
            fixedFooter={true}
            selectable={true}
            multiSelectable={true}
          >
            <TableBody
              displayRowCheckbox={true}
              showRowHover={true}
            >
              {tableData.map( (row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{row.name}</TableRowColumn>
                </TableRow>
                ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                  <FlatButton className='pull-left' label="Close" onClick={this.closePopover.bind(this)} primary={true} />
                  <FlatButton className='pull-right' label="Select" onClick={this.props.handleSet} primary={true} />
                </TableRowColumn>
              </TableRow>
            </TableFooter>

          </Table>
        </Popover>
      </div>
    );

  }

};

MulitselectPopover.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.array,
  buttonText: PropTypes.array.isRequired,
  // handleSet: PropTypes.function.isRequired,
};

export default MulitselectPopover;