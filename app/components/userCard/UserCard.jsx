import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as profilesActionCreators from 'actions/profiles';

import CardEdit from 'components/userCard/UserCardEdit'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

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

  state = {
    showEdit: false
  }

  editIconShow() {
    this.setState({
      showEdit: true
    })
  }

  editIconHide() {
    this.setState({
      showEdit: false
    })
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
      <div className={cx('userCard--container') + ' text-center'} onMouseEnter={this.editIconShow.bind(this)} onMouseLeave={this.editIconHide.bind(this)}>
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
                {this.state.showEdit ? (
                  <EditIcon
                    onClick={this.toggleEdit.bind(this)}
                    color="#66747F"
                    hoverColor="#f20253"
                    className={cx("userCard--edit")}
                  />
                ) : (
                  <span />            
                )}
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