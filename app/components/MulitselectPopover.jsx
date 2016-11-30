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
    const { data, selected } = this.props;
    return data.map( (dItem) => {
      let sel = false;
      if (selected && selected.length > 0) sel = (selected.indexOf(dItem) !== -1);  
      return {name: dItem, selected: sel}
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

  onToggleSelect (i, bool, e) {
    e.preventDefault();
    const data = this.buildTableData()
    this.props.onToggleSelect(data[i].name)
  }

  handleSet() {
    this.closePopover();
    this.props.handleSet();
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
          labelStyle={{fontSize: '10px', paddingLeft: '9px', paddingRight: '9px'}}
          onClick={this.openMultiSelect}
          label={buttonText}
          style={this.props.style}
        />
        <Popover
          open={this.state.open}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
          anchorEl={this.state.anchorEl}
          style={{height: '300px', width: '300px'}}
        >
        <Table
            height='240px'
            fixedFooter={true}
            selectable={true}
            multiSelectable={true}
            onCellClick={this.onToggleSelect.bind(this)} 
          >
            <TableBody
              displayRowCheckbox={true}
              deselectOnClickaway={false}
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
                  <FlatButton className='pull-right' label="Select" onClick={this.handleSet.bind(this)} primary={true} />
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
  buttonText: PropTypes.string,
  onToggleSelect: PropTypes.func.isRequired,
  handleSet: PropTypes.func.isRequired,
};

export default MulitselectPopover;