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
    toggleEdit: PropTypes.func.isRequired,
    schoolChange: PropTypes.func.isRequired,
    saveSchoolEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  toggleEdit () {
    const { toggleEdit, school } = this.props;
    toggleEdit(school);
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
            school, 
            schoolChange
          } = this.props;

    const addComma = (items) => {
      if (items.length > 1) {
        let resp = '';
        items.map( (item, i) => {
          i + 1 === items.length ? (
            resp+= item
          ) : (
            resp+= item + ','
          )
        })
        return resp
      } else {
        return items
      }
    }
    
    if (school.edit) {

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
          <h4 className={cx("schoolItem--header")}>{school.name} | { school.degree }</h4>
          <p className={cx("schoolItem--subHeader", 'date')}>{ moment(school.startDate).format('YYYY') } - {school.current ? ( 'Current' ) : ( moment(school.endDate).format('YYYY')) }</p>
          <p className={cx("schoolItem--subHeader")}>Major{school.minor.length > 1 ? ("s") : (null)} | { addComma(school.major) } </p>
          { school.minor && school.minor[0] ? (
            <p className={cx("schoolItem--subHeader")}>Minor{school.minor.length > 1 ? ("s") : (null)} | { addComma(school.minor) }</p>
          ) : (null)}
        </div>
      )

    }
  
  }
};