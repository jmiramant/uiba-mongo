import React, { PropTypes } from 'react';
import RoleSkills from 'components/roles/RoleSkillList';
import classNames from 'classnames/bind';
import styles from 'css/components/roleRequirements';
const cx = classNames.bind(styles);

export default class RoleRequirements extends React.Component {
  
  static PropTypes =  {
    skill: PropTypes.object.isRequired,
    skills: PropTypes.array.isRequired,
    showSkillAdd: PropTypes.bool.isRequired,
    messages: PropTypes.object.isRequired,
    onEditSave: PropTypes.func.isRequired,
    fetchSkills: PropTypes.func.isRequired,
    onSkillSave: PropTypes.func.isRequired,
    skillChange: PropTypes.func.isRequired,
    skillsChange: PropTypes.func.isRequired,
    onSkillDelete: PropTypes.func.isRequired,
    toggleSkillAdd: PropTypes.func.isRequired,
    toggleSkillEdit: PropTypes.func.isRequired,
  }

  state = {
    validationErrors: {},
    skillError: ''
  }

  constructor(props) {
    super(props);
  }

  onSkillSave(skill) {
    const { skills , onSkillSave } = this.props;
    if (_.filter(skills, (s) => {return s.type === skill.type}).length) {
      this.setState({skillError: 'This skill has already been added.'});
      setTimeout(() => {
        this.setState({skillError: undefined});
      }, 4000)
    } else {  
      onSkillSave(skill);
    }

  }

  toggleSkillEdit(skill) {
    this.props.toggleSkillEdit(skill)
  }

  render () {

    const {
      skill, 
      skills,
      messages,
      onEditSave,
      skillChange,
      showSkillAdd,
      onSkillDelete,
      skillsChange,
      toggleSkillAdd,
      toggleSkillEdit,
    } = this.props;

    console.log(skills[6])
    const {
      skillError
    } = this.state;

    return (
      <div className={cx('req-container')}>
        <RoleSkills 
          skill={skill}
          skills={skills}
          addVisible={showSkillAdd}
          errorMessage={messages.errorMessage}
          toggleSkillAdd={toggleSkillAdd}
          toggleSkillEdit={this.toggleSkillEdit.bind(this)}
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