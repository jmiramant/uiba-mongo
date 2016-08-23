import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/schoolList';
import moment from 'moment';
import SchoolItem from 'components/profile/SchoolItem';
import SchoolAdd from './SchoolAdd';

const cx = classNames.bind(styles);

export default class SchoolList extends React.Component {
  
  static propTypes = {
    schools: PropTypes.array,
    onSchoolSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = { addVisibile: false } ;
  }
  
  showAddSchool = () => {
    this.setState({addVisibile: true})
  }

  handleSave = (data) => {
    this.props.onSchoolSave(data);
    this.setState({addVisibile: false})
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (school) => {
    this.props.onSchoolDelete(school);
  }

  render () {
    let { schools } = this.props;
    let lengthIndex = schools.length - 1;
    const { addVisibile } = this.state;

    return (
      <div className={cx('schoolList--container') + ' col-md-7'}>
        {schools.map((school, i) => {
            return (<SchoolItem 
                      key={school._id} 
                      saveSchoolEdit={this.handleEditSave} 
                      handleDelete={this.handleDelete}
                      school={school} 
                      isntLast={lengthIndex !== i} />);
        })}

        { this.state.addVisibile ? (
          <SchoolAdd addVisibile={addVisibile} onSchoolSave={this.handleSave} />
        ) : (
          <div>
            <div onClick={this.showAddSchool} className='pull-right'>Add School</div>
          </div>
        ) }
      </div>
    )
  }
};