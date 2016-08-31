import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/skill';
import moment from 'moment';
import SkillItem from 'components/skills/SkillItem';
import SkillAdd from 'components/skills/SkillAdd';
import NullProfItem from 'components/ProfileNull';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

const cx = classNames.bind(styles);

export default class SkillList extends React.Component {
  
  static propTypes = {
    skills: PropTypes.array,
    onSkillSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = { addVisibile: false } ;
  }
  
  toggleAddSkill = () => {
    this.setState({addVisibile: !this.state.addVisibile})
  }

  handleSave = (data) => {
    this.props.onSkillSave(data);
    this.setState({addVisibile: false})
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (skill) => {
    this.props.onSkillDelete(skill);
  }

  render () {
    let { skills } = this.props;
    let lengthIndex = skills.length - 1;
    const { addVisibile } = this.state;

    const renderItems = (
      <div>
        {skills.map((skill, i) => {
            return (<SkillItem 
                      key={skill._id} 
                      saveSkillEdit={this.handleEditSave} 
                      handleDelete={this.handleDelete}
                      skill={skill} 
                      isntLast={lengthIndex !== i} />);
        })}
      </div>
    )

    return (
      <div className={cx('skillList--container') + ' col-md-8 col-md-offset-2'}>
        { skills.length ? (
          <div>
            {renderItems}
          </div>
        ) : (
          <span>
            <NullProfItem target="skill" />
          </span>
        )}
        { this.state.addVisibile ? (
          <SkillAdd toggleEdit={this.toggleAddSkill.bind(this)} addVisibile={addVisibile} onSkillSave={this.handleSave} />
        ) : (
          <FloatingActionButton 
            onClick={this.toggleAddSkill}
            className={cx('schoolItem--add') + ' pull-right'}
            mini={true}
          >
            <AddIcon />
          </FloatingActionButton>
        ) }
      </div>
    )
  }
};