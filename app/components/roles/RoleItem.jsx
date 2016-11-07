import React, { PropTypes } from 'react';

import RoleAdd from 'components/roles/RoleAdd';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import LinkIcon from 'material-ui/svg-icons/content/link';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/role';
const cx = classNames.bind(styles);

export default class RoleItem extends React.Component {
  
  static propTypes = {
    role: PropTypes.object.isRequired, 
    roleChange: PropTypes.func.isRequired,
    saveRoleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  state = {
    validationErrors: {},
    edit: false,
  }

  toggleEdit () {
    this.setState({edit: !this.state.edit})
  }

  saveEdit (role) {
    this.props.saveRoleEdit(role)
    this.toggleEdit()
  }

  handleDelete () {
    this.props.handleDelete(this.props.role)
  }

  render () {
    const { 
            isntLast, 
            role, 
            roleChange
          } = this.props;

    let descId = 0;

    if (this.state.edit) {

      return (
        <RoleAdd
          role={role}
          roleChange={roleChange}
          addVisible={false}
          onRoleSave={this.saveEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)}
        />
      )
    
    } else {

      return (
        <div className={cx('roleItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          <EditIcon
            color="#66747F"
            hoverColor="#f20253"
            onClick={this.toggleEdit.bind(this)}
            className={cx("roleItem--edit") + ' pull-right'}
          />
          <h4 
            className={cx("roleItem--header")}
          >
            {role.applicantCode} { (role.applicantCode && role.applicantCode.length > 0) ? (
                <a 
                  href={role.applicantCode}
                  target="_blank">
                    <LinkIcon
                      hoverColor="#f20253"
                      className={cx('roleItem--link')}
                    />
                </a>
              ) : (null)}
          </h4>
          <p className={cx("roleItem--date", 'date')}> { 
              moment(role.startDate).format('MMM, YYYY')
            } - { 
              role.current ? ( 
                'Current' 
              ) : ( 
                moment(role.endDate).format('MMM, YYYY')) 
            } 
          </p>
          <div className={cx('roleItem--description')}>
          {role.description.split('\n').map((item) => {
            let key = role._id + item + descId
            return (
              <span key={key}>{item}<br/></span>
            )
            descId++
          })}</div>
        </div>
      )

    }
  
  }
};