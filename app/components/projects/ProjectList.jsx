import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/schoolList';
import moment from 'moment';
import ProjectItem from 'components/projects/ProjectItem';
import ProjectAdd from 'components/projects/ProjectAdd';

const cx = classNames.bind(styles);

export default class ProjectList extends React.Component {
  
  static propTypes = {
    projects: PropTypes.array,
    onSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = { addVisibile: false } ;
  }
  
  showAddProject = () => {
    this.setState({addVisibile: true})
  }

  handleSave = (data) => {
    this.props.onSave(data);
    this.setState({addVisibile: false})
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (project) => {
    this.props.onProjectDelete(project);
  }

  render () {
    let { projects } = this.props;
    let lengthIndex = projects.length - 1;
    const { addVisibile } = this.state;

    return (
      <div className={cx('projectList--container') + ' col-md-5'}>
        {projects.map((project, i) => {
            return (<ProjectItem 
                      key={project._id} 
                      saveEdit={this.handleEditSave} 
                      handleDelete={this.handleDelete}
                      project={project} 
                      isntLast={lengthIndex !== i} />);
        })}

        { this.state.addVisibile ? (
          <ProjectAdd addVisibile={addVisibile} onSave={this.handleSave} />
        ) : (
          <div>
            <div onClick={this.showAddProject} className='pull-right'>Add Project</div>
          </div>
        ) }
      </div>
    )
  }
};