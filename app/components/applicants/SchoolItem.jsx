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
  }

  constructor(props) {
    super(props);
  }

  render () {
    const { 
            school, 
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

    return (
      <div className={cx('schoolItem--container')}>
        <h4 className={cx("schoolItem--header")}>{school.name} | { school.degree }</h4>
        <p className={cx("schoolItem--subHeader", 'date')}>{ moment(school.startDate).format('YYYY') } - {school.current ? ( 'Current' ) : ( moment(school.endDate).format('YYYY')) }</p>
        <p className={cx("schoolItem--subHeader")}>Major{school.minor.length > 1 ? ("s") : (null)} | { addComma(school.major) } </p>
        { school.minor && school.minor[0] ? (
          <p className={cx("schoolItem--subHeader")}>Minor{school.minor.length > 1 ? ("s") : (null)} | { addComma(school.minor) }</p>
        ) : (null)}
      </div>
    )

  
  }
};