import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as profilesActionCreators from 'actions/profiles';

import CardEdit from 'components/userCard/UserCardEdit'

import DefaultUserIcon from 'material-ui/svg-icons/action/account-circle';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/userCard';
import moment from 'moment';

const cx = classNames.bind(styles);

export default class UserCard extends React.Component {
  
  static propTypes = {
    editMode: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    onEditSave: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  toggleEdit = () => {
    this.props.toggleEdit(this.props.editMode)
  }

  render () {
    const {
      profile,
      editMode,
      actions

    } = this.props;
    return (
      <div className={cx('userCard--container') + ' text-center'}>
        <div className={cx('profile--container')}>
          <div className={cx('userCard--picture-container')}>
            {profile.picture ? (
              <img className={cx('userCard--picture-img')} src={profile.picture}/>
            ) : (
              <DefaultUserIcon className={cx('userCard--default-icon')}/>            
            )}
          </div>
          <div onDoubleClick={this.toggleEdit.bind(this)}>
            {editMode ? (
              <CardEdit
                profile={profile}
                profileChange={actions.profileChange}
                toggleEdit={this.toggleEdit}
                onEditSave={this.handleEditSave}
              />
            ) : (
              <div>
                <div className={cx('userCard--name')}>{profile.name}</div>
                <div>{profile.headline}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
};


function mapStateToProps(state) {
  return {
    profile: state.profile.profile
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(profilesActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCard);