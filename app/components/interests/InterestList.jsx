import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as interestsActionCreators from 'actions/interests';

import InterestItem from 'components/interests/InterestItem';
import InterestAdd from 'components/interests/InterestAdd';
import NullProfItem from 'components/ProfileNull';
import ErrorMessage from 'components/ErrorMessage';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/interest';
import moment from 'moment';
const cx = classNames.bind(styles);

class InterestList extends React.Component {
  
  static propTypes = {
    interests: PropTypes.array,
    addVisible: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    onEditSave: PropTypes.func.isRequired,
    toggleInterestAdd: PropTypes.func.isRequired,
    onInterestSave: PropTypes.func.isRequired,
    onInterestDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }
  
  toggleAddInterest = () => {
    let {
      addVisible,
      interest,
      toggleInterestAdd
    } = this.props

    toggleInterestAdd(addVisible, interest)
  }
  
  handleSave = (data) => {
    let {
      addVisible,
      interest,
      toggleInterestAdd,
      onInterestSave
    } = this.props

    onInterestSave(data);
    toggleInterestAdd(addVisible, interest)
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (interest) => {
    this.props.onInterestDelete(interest);
  }

  render () {
    let { interest,
          interests,
          addVisible,
          actions,
          errorMessage,
        } = this.props;

    const lengthIndex = interests.length - 1;

    const listClass = classNames({
      [cx('horizontal')]: true,
      [cx('left')]: true,
      [cx('split')]: addVisible,
    });

    const addClass = classNames({
      [cx('horizontal')]: true,
      [cx('left-border')]: addVisible,
      [cx('no-items')]: interests.length === 0,
      [cx('right')]: true,
      [cx('split')]: addVisible,
    });

    const renderItems = (
      <div>
        {interests.map((interest, i) => {
          return (<InterestItem 
                    key={interest._id} 
                    interest={interest}
                    interestChange={actions.interestsChange}
                    saveInterestEdit={this.handleEditSave} 
                    handleDelete={this.handleDelete}
                  />)
        })}
      </div>
    )

    return (
      <div className={cx('interestList--bootstrap-container')}>
        <div className={cx('interestList--container')}>

          <div className={cx('cta')}>
            <p className={cx('cta-msg')}>Please include any personal interests such as hobbies, activities, passions, etc, to help the team better understand you.</p>
          </div>

          { interests.length ? (
            <div className={listClass}>
              {renderItems}
            </div>
          ) : (
            <span>
              <NullProfItem target="interest" />
            </span>
          )}
          <div className={addClass}>
            <ErrorMessage 
              errorText={errorMessage}
            />
            <InterestAdd
              isEdit={false}
              interest={interest}
              interestChange={actions.interestChange}
              toggleEdit={this.toggleAddInterest.bind(this)} 
              addVisible={addVisible}
              onInterestSave={this.handleSave}
            />

          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    interest: state.interest.interest
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(interestsActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterestList);