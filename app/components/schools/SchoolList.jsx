import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/school';
import moment from 'moment';
import SchoolItem from 'components/schools/SchoolItem';
import SchoolAdd from 'components/schools/SchoolAdd';
import NullProfItem from 'components/ProfileNull';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

const cx = classNames.bind(styles);

export default class SchoolList extends React.Component {
  
  static propTypes = {
    schools: PropTypes.array,
    onSchoolSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    this.state = { addVisibile: false } ;
  }
  
  toggleAddVisible = () => {
    this.setState({addVisibile: !this.state.addVisibile})
  }

  handleSave = (data) => {
    this.props.onSchoolSave(data);
    this.setState({addVisibile: false})
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
    this.setState({addVisibile: false})
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
      <div className={cx('schoolList--container') + ' col-md-8 col-md-offset-2'}>

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
          <SchoolAdd toggleEdit={this.toggleAddVisible.bind(this)} addVisibile={addVisibile} onSchoolSave={this.handleSave} />
        ) : (
          <div>
            <FloatingActionButton 
              onClick={this.toggleAddVisible}
              className={cx('schoolItem--add') + ' pull-right'}
              mini={true}
            >
              <AddIcon />
            </FloatingActionButton>
          </div>
        ) }
      </div>
    )
  }
};