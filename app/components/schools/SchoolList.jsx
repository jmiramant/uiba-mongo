import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/schoolList';
import moment from 'moment';
import SchoolItem from 'components/schools/SchoolItem';
import SchoolAdd from 'components/schools/SchoolAdd';
import NullProfItem from 'components/ProfileNull';

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

    const renderItems = (
      <div>
        {schools.map((school, i) => {
            return (<SchoolItem 
                      key={school._id} 
                      saveSchoolEdit={this.handleEditSave} 
                      handleDelete={this.handleDelete}
                      school={school} 
                      isntLast={lengthIndex !== i} />);
        })}
      </div>
    )

    return (
      <div className={cx('schoolList--container') + ' col-md-7 col-md-offset-1'}>

        { schools.length ? (
          <div>
            {renderItems}
          </div>
        ) : (
          <span>
            <NullProfItem target="school" />
          </span>
        )}

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