import React, { PropTypes } from 'react';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import classNames from 'classnames/bind';
import styles from 'css/components/applicant/filterPersistDropdown';
const cx = classNames.bind(styles);

export default class FilterPersistDropdown extends React.Component {
  
  static propTypes = {
    role: PropTypes.object.isRequired,
    setFilters: PropTypes.object.isRequired,
    isFilterSet: PropTypes.bool.isRequired,
    fetchFilters: PropTypes.func.isRequired,
    onDeleteFilter: PropTypes.func.isRequired,
    onSelectFilter: PropTypes.func.isRequired,
    handleFilterSave: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }
  
  state = {
    popover: { open: false, anchorEl: null },
    name: '',
    error: undefined,
  }

  openPopover = (e) => {
    this.setState({popover: {
        open: true,
        anchorEl: e.currentTarget,
      }
    });
  };
  
  closePopover = (popover) => {
    this.setState({
      popover: {
        open: false, 
        anchorEl: null 
      }
    })
  }

  componentWillMount() {
    this.props.fetchFilters(this.props.role._id);
  }

  handleChange = () => (e, val) => {
    this.setState({name: val, error: undefined});
  };

  entryValidated() {
    const validResp = {valid: true};
    
    const isDuplicateName = _.filter(this.props.filters, (f) => {return f.name.toLowerCase() === this.state.name.toLowerCase();}).length !== 0;

    if (isDuplicateName) {
      validResp.error = 'Please use a unique filter name.';
      validResp.valid = false;
    }

    return validResp

  }

  handleSave () {
    const validation = this.entryValidated();
    if (validation.valid) {
      this.props.handleFilterSave({
        ...this.props.setFilters,
        roleId: this.props.role._id,
        name: this.state.name
      });
      this.setState({name: ''});
      this.closePopover();
    } else {
      this.setState({error: validation.error})
    }
  }

  onFilterClick (e, f) {
    if (e.target.tagName !== 'svg') { 
      this.closePopover();
      const selectedFilter = _.find(this.props.filters, (_f) => {return _f.name === e.target.innerText});
      this.props.onSelectFilter(selectedFilter);
    }
  }

  onDefaultFilter() {
    this.closePopover();
    this.props.onSelectFilter(this.props.defaultFilter);
  }

  onCloseClick (name, scope, e) {
    e.preventDefault();
    const selectedFilter = _.find(scope.props.filters, (_f) => {return _f.name === name});
    scope.props.onDeleteFilter(selectedFilter);
  }

  render () {
    
    const {
      name,
      error,
      popover
    } = this.state;

    const {
      filters,
      isFilterSet
    } = this.props;

    const iconStyle = {
      width: '18px',
      height: '18px',
      margin: '4px'
    };

    return (
      <div className={cx('filter-persist-container')}>
        <RaisedButton 
          labelStyle={{fontSize: '11px'}} 
          className={cx('filter-btn')}
          label="Save/Load Filter" 
          onClick={(e) => {this.openPopover(e)}}
          primary={true} 
        />
        <Popover
          useLayerForClickAway={false}
          onRequestClose={() => {this.closePopover()}}
          open={popover.open}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
          anchorEl={popover.anchorEl}
          style={{padding: '20px', minWidth: '250px'}}
        >
          
            <div className={cx('saved-filter-container')}>
              <h5>Saved Filters:</h5>
              <Divider />
              <List
                style={{margin: '0 0 10px 0'}}
              >
                { filters.map( (f, i) => {
                  return (<ListItem 
                            key={f.name + f.i}
                            primaryText={f.name}
                            leftIcon={<ChevronRight style={iconStyle} />} 
                            rightIcon={<CloseIcon 
                              style={iconStyle} 
                              onClick={(e) => {this.onCloseClick(f.name, this, e)}}
                            />} 
                            style={{fontSize: '14px'}}
                            innerDivStyle={{padding: '5px 16px 5px 25px'}}
                            onClick={this.onFilterClick.bind(this)} 
                          />)
                })}
                { filters.length > 0 ? (<Divider />) : (null) }
                <ListItem 
                  key='Requirement'
                  primaryText="Filter by Role Requirements"
                  leftIcon={<ChevronRight style={iconStyle} />} 
                  style={{fontSize: '14px'}}
                  innerDivStyle={{padding: '5px 16px 5px 25px'}}
                  onClick={this.onDefaultFilter.bind(this)}
                />
              </List>
            </div>

          { isFilterSet ? (
            <div className={cx('name-container')}>
              <h5>Save Current Filter:</h5>
              <Divider />
              <div className={cx('name-entry')}>
                <TextField
                  floatingLabelText="Filter Name"
                  value={name}
                  errorText={error}
                  onChange={this.handleChange()}
                  textareaStyle={{marginTop: "0px", height: '57px'}}
                />
                <RaisedButton 
                  label="Save"
                  primary={true}
                  onClick={() => {this.handleSave()}}
                  style={{margin: '0 10px 10px'}}
                  labelStyle={{fontSize: '12px'}}
                />
              </div>
            </div>
          ) : (null)}
          <FlatButton 
            className='pull-right'
            label="Close"
            onClick={() => {this.closePopover()}}
            primary={true}
            style={{marginTop: '10px'}}
          />
        </Popover>
      </div>
    )

  }
};

            
