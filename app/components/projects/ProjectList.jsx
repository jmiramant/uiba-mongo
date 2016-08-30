import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/projectList';
import moment from 'moment';
import ProjectItem from 'components/projects/ProjectItem';
import ProjectAdd from 'components/projects/ProjectAdd';
import NullProfItem from 'components/ProfileNull';

const cx = classNames.bind(styles);

export default class ProjectList extends React.Component {
  
  static propTypes = {
    projects: PropTypes.array,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
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
    this.props.onDelete(project);
  }

  render () {
    const { projects } = this.props;
    const { addVisibile } = this.state;

    const renderItems = (
      <div>
        {projects.map((project, i) => {
            return (<ProjectItem 
                      key={project._id} 
                      saveEdit={this.handleEditSave} 
                      handleDelete={this.handleDelete}
                      project={project} />);
        })}
      </div>
    )
    
    return ( <div className={cx('projectList--container') + ' col-md-5'}>
      { projects.length ? (
        <div>
          {renderItems}
        </div>
      ) : (
        <span>
          <NullProfItem target="project" />
        </span>
      )}
      { this.state.addVisibile ? (
        <ProjectAdd addVisibile={addVisibile} onSave={this.handleSave} />
      ) : (
        <div>
          <div onClick={this.showAddProject} className='pull-right'>Add Project</div>
        </div>
      ) }
    </div>)
  }
};