import React, { PropTypes } from 'react';

import InterestAdd from 'components/interests/InterestAdd';

import Chip from 'material-ui/Chip';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/interest';
const cx = classNames.bind(styles);

export default class InterestItem extends React.Component {
  
  static propTypes = {
    interest: PropTypes.object.isRequired,
    interestChange: PropTypes.func.isRequired,
    saveInterestEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  state = {
    edit: false,
  }

  toggleEdit () {
    this.setState({edit: !this.state.edit})
  }

  saveEdit (interest) {
    this.props.saveInterestEdit(interest)
    this.toggleEdit()
  }

  handleDelete () {
    this.props.handleDelete(this.props.interest)
  }

  render () {
    const { 
            isntLast, 
            interest, 
            interestChange
          } = this.props;

    if (this.state.edit) {

      return (
        <InterestAdd
          isEdit={true}
          interest={interest}
          interestChange={interestChange}
          onInterestSave={this.saveEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)}
        />
      )
    
    } else {

      return (
        <div className={cx('chip-container')}>
          <Chip className={cx('interestItem--chip')}>
            {interest.interest} 
            <span 
              onClick={this.toggleEdit.bind(this)}
              className={cx('interestItem--editBg')}
            >
              <EditIcon
                color='#E0E0E0'
                className={cx('interestItem--editIcon')}
              />
            </span>
          </Chip>
        </div>
      )

    }
  
  }
};