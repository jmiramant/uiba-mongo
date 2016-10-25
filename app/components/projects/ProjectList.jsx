import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as projectsActionCreators from 'actions/projects';

import ProjectItem from 'components/projects/ProjectItem';
import ProjectAdd from 'components/projects/ProjectAdd';
import NullProfItem from 'components/ProfileNull';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/projectList';
import moment from 'moment';
const cx = classNames.bind(styles);

class ProjectList extends React.Component {
  
  static propTypes = {
    projects: PropTypes.array,
    addVisible: PropTypes.bool.isRequired,
    onEditSave: PropTypes.func.isRequired,
    toggleProjectAdd: PropTypes.func.isRequired,
    onProjectSave: PropTypes.func.isRequired,
    onProjectDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }
  
  toggleAddProject = () => {
    this.props.toggleProjectAdd(this.props.addVisible)
  }

  handleSave = (data) => {
    this.props.onProjectSave(data);
    this.props.toggleProjectAdd(this.props.addVisible)
  }

  handleEditSave = (data) => {
    this.props.onEditSave(data);
  }

  handleDelete = (project) => {
    this.props.onProjectDelete(project);
  }

  render () {
    const { project,
            projects,
            addVisible,
            actions
          } = this.props;
    const lengthIndex = projects.length - 1;

    const renderItems = (
      <div>
        {projects.map((_project, i) => {
            return (<ProjectItem 
                      key={_project._id} 
                      project={_project} 
                      projectChange={actions.projectsChange}
                      handleDelete={this.handleDelete}
                      saveProjectEdit={this.handleEditSave} 
                      isntLast={lengthIndex !== i} 
                    />);
        })}
      </div>
    )
    
    return ( <div className={cx('projectList--container')}>
      
      { projects.length ? (
        <div>
          {renderItems}
        </div>
      ) : (
        <span>
          <NullProfItem target="project" />
        </span>
      )}

      <ProjectAdd
        project={project}
        onProjectSave={this.handleSave} 
        projectChange={actions.projectChange}
        toggleEdit={this.toggleAddProject.bind(this)} 
        addVisible={addVisible}
      />

    </div>)
  }
};

function mapStateToProps(state) {
  return {
    project: state.project.project
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(projectsActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);