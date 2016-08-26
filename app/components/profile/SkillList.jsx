import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/schoolList';
import moment from 'moment';
import SkillItem from 'components/profile/SkillItem';
import SkillAdd from './SkillAdd';

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
  
  showAddSkill = () => {
    this.setState({addVisibile: true})
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

    return (
      <div className={cx('skillList--container') + ' col-md-5'}>
        {skills.map((skill, i) => {
            return (<SkillItem 
                      key={skill._id} 
                      saveSkillEdit={this.handleEditSave} 
                      handleDelete={this.handleDelete}
                      skill={skill} 
                      isntLast={lengthIndex !== i} />);
        })}

        { this.state.addVisibile ? (
          <SkillAdd addVisibile={addVisibile} onSkillSave={this.handleSave} />
        ) : (
          <div>
            <div onClick={this.showAddSkill} className='pull-right'>Add Skill</div>
          </div>
        ) }
      </div>
    )
  }
};