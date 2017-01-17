import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schoolsActionCreators from 'actions/schools';

import SchoolItem from 'components/schools/SchoolItem';
import SchoolAdd from 'components/schools/SchoolAdd';
import NullProfItem from 'components/ProfileNull';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/school';
import moment from 'moment';
const cx = classNames.bind(styles);

class SchoolList extends React.Component {
  
  static propTypes = {
    schools: PropTypes.array,
    addVisible: PropTypes.bool.isRequired,
    onEditSave: PropTypes.func.isRequired,
    toggleSchoolAdd: PropTypes.func.isRequired,
    toggleSchoolEdit: PropTypes.func.isRequired,
    onSchoolSave: PropTypes.func.isRequired,
    onSchoolDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }
  
  toggleAddSchool() {
    this.props.toggleSchoolAdd(this.props.addVisible)
  }

  toggleEditSchool(school) {
    this.props.toggleSchoolEdit(school);
  }

  handleSave = (data) => {
    this.props.onSchoolSave(data);
    this.props.toggleSchoolAdd(this.props.addVisible)
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (school) => {
    this.props.onSchoolDelete(school);
  }

  render () {
    const { school,
          schools,
          addVisible,
          actions
        } = this.props;
    const lengthIndex = schools.length - 1;

    const renderItems = (
      <div>
        {schools.map((_school, i) => {
            return (<SchoolItem
                      key={_school._id} 
                      school={_school} 
                      schoolChange={actions.schoolsChange}
                      handleDelete={this.handleDelete}
                      saveSchoolEdit={this.handleEditSave} 
                      isntLast={lengthIndex !== i}
                      toggleEdit={this.toggleEditSchool.bind(this)}
                    />);
        })}
      </div>
    )

    return (
      <div className={cx('schoolList--container')}>

        <div className={cx('cta')}>
          <p className={cx('cta-msg')}>Please include your education history with the dates of attendance and degrees earned.</p>
        </div>

        { schools.length ? (
          <div>
            {renderItems}
          </div>
        ) : (
          <span>
            <NullProfItem target="school" />
          </span>
        )}
        
        <SchoolAdd 
          school={school}
          onSchoolSave={this.handleSave} 
          schoolChange={actions.schoolChange}
          toggleEdit={this.toggleAddSchool.bind(this)} 
          addVisible={addVisible} 
        />

      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    school: state.school.school
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(schoolsActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolList);