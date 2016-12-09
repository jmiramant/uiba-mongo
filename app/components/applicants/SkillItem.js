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

  properName (str) {
    return str.split('-').map((s) => {
      return s.charAt(0).toUpperCase() + s.slice(1)
    }).join(' ');
  }

  render () {
    const { 
      skill, 
    } = this.props;

    const chip = (<Chip className={cx('skillItem--chip')}>
      {skill.type} 
    </Chip>)

    return (
      <li className={cx('app-chip-container')}>
        <span className={cx('app-chip-title')}>{this.properName(skill.type)}</span> <br/> 
        Years: {skill.lengthOfUse} - 
        Level: {['Learning', 'Intermediate', 'Competent', 'Expert'][skill.proficiency - 1]}
      </li>
    )

  }
};