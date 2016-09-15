import React, { PropTypes } from 'react';

import SchoolAdd from 'components/schools/SchoolAdd';
import SchoolNameTypeahead from '../../containers/Typeahead';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Divider from 'material-ui/Divider';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/school';
const cx = classNames.bind(styles);

export default class SchoolItem extends React.Component {
  
  static propTypes = {
    school: PropTypes.object.isRequired, 
    schoolChange: PropTypes.func.isRequired,
    saveSchoolEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  state = {
    edit: false,
  }

  toggleEdit () {
    this.setState({edit: !this.state.edit})
  }

  saveEdit (school) {
    this.props.saveSchoolEdit(school)
    this.toggleEdit()
  }

  handleDelete () {
    this.props.handleDelete(this.props.school)
  }

  render () {
    const { 
            isntLast, 
            school, 
            schoolChange
          } = this.props;

    const addComma = (v, i, ct) => {
      if ((i+1) === ct.length) {
        return v;
      } else {
        return v + ', ';
      }
    }
    
    if (this.state.edit) {

      return (
        <SchoolAdd
          school={school}
          schoolChange={schoolChange}
          addVisible={false}
          onSchoolSave={this.saveEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)}
        />
      )
    
    } else {

      return (
        <div className={cx('schoolItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          <EditIcon
            color="#66747F"
            hoverColor="#f20253"
            onClick={this.toggleEdit.bind(this)}
            className={cx("schoolItem--edit") + ' pull-right'}
          />
          <h4 className={cx("schoolItem--header")}>{school.name} | { school.current ? ( 'Current' ) : ( moment(school.endDate).format('YYYY')) }</h4>
          <p className={cx("schoolItem--subHeader")}>{ school.major[0] } | { school.degree }</p>
        </div>
      )

    }
  
  }
};