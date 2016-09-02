import React, { PropTypes } from 'react';

import ProjectAdd from 'components/projects/ProjectAdd';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/jobItem';
const cx = classNames.bind(styles);

export default class ProjectItem extends React.Component {
  
  static propTypes = {
    project: PropTypes.object.isRequired, 
    projectChange: PropTypes.func.isRequired,
    saveProjectEdit: PropTypes.func.isRequired,
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

  saveEdit (project) {
    this.props.saveEdit(project)
    this.toggleEdit()
  }

  handleDelete () {
    this.props.handleDelete(this.props.project)
  }

  render () {
    const { 
            isntLast, 
            project, 
            projectChange
          } = this.props;

    if (this.state.edit) {

      return (
        <ProjectAdd
          project={project}
          projectChange={projectChange}
          addVisibile={false}
          onProjectSave={this.saveEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)}
        />
      )
    
    } else {

      return (
        <div className={cx('projectItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          <a href={project.projectUrl} target="_blank"><p className={cx("projectItem--header")}>{project.name} | { project.current ? ( 'Current' ) : ( moment(project.endDate).format('MMM, YYYY')) }</p></a>
        </div>
      )

    }
  
  }
};