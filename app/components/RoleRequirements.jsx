import React, { PropTypes } from 'react';
import RoleSkills from 'components/roles/RoleSkillList';
import classNames from 'classnames/bind';
import styles from 'css/components/roleRequirements';
const cx = classNames.bind(styles);

export default class RoleRequirements extends React.Component {
  
  static PropTypes =  {
    roles: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    onEditSave: PropTypes.func.isRequired,
    fetchSkills: PropTypes.func.isRequired,
    onSkillSave: PropTypes.func.isRequired,
    skillChange: PropTypes.func.isRequired,
    skillsChange: PropTypes.func.isRequired,
    onSkillDelete: PropTypes.func.isRequired,
  }

  state = {
    validationErrors: {},
    skillError: ''
  }

  constructor(props) {
    super(props);
  }

  onSkillSave(skill) {
    const { roles: { skills }, onSkillSave } = this.props;
    if (_.filter(skills, (s) => {return s.type === skill.type}).length) {
      this.setState({skillError: 'This skill has already been added.'});
      setTimeout(() => {
        this.setState({skillError: undefined});
      }, 4000)
    } else {  
      onSkillSave(skill);
    }

  }

  render () {

    const {
      roles,
      messages,
      onEditSave,
      onSkillDelete,
      skillChange,
      skillsChange,
      toggleSkillAdd,
    } = this.props;

    const {
      skillError
    } = this.state;

    return (
      <div className={cx('req-container')}>
        <RoleSkills 
          skill={roles.skill}
          skills={roles.skills}
          addVisible={roles.showSkillAdd}
          errorMessage={messages.errorMessage}
          toggleSkillAdd={toggleSkillAdd}
          skillChange={skillChange}
          skillsChange={skillsChange}
          onEditSave={onEditSave}
          errorText={skillError}
          onSkillSave={this.onSkillSave.bind(this)}
          onSkillDelete={onSkillDelete} 
        />
      </div>
    )
  }
};