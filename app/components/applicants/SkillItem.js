import React, { PropTypes } from 'react';

import Chip from 'material-ui/Chip';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/skill';
const cx = classNames.bind(styles);

export default class SkillItem extends React.Component {
  
  static propTypes = {
    skill: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render () {
    const { 
      skill, 
    } = this.props;

    return (
      <div className={cx('chip-container')}>
      
        <Chip className={cx('skillItem--chip')}>
          {skill.type} 
        </Chip>
      </div>
    )

  }
};