import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as projectsActionCreators from 'actions/projects';

import ProjectItem from 'components/projects/ProjectItem';
import ProjectAdd from 'components/projects/ProjectAdd';
import NullProfItem from 'components/ProfileNull';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/projectList';
import moment from 'moment';
const cx = classNames.bind(styles);

class ProjectList extends React.Component {
  
  static propTypes = {
    projects: PropTypes.array,
    addVisibile: PropTypes.bool.isRequired,
    onEditSave: PropTypes.func.isRequired,
    toggleProjectAdd: PropTypes.func.isRequired,
    onProjectSave: PropTypes.func.isRequired,
    onProjectDelete: PropTypes.func.isRequired
  }


  constructor(props) {
    super(props);
  }
  
  toggleAddProject = () => {
    this.props.toggleProjectAdd(this.props.addVisibile)
  }

  handleSave = (data) => {
    this.props.onProjectSave(data);
    this.props.toggleProjectAdd(this.props.addVisibile)
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
            addVisibile,
            actions
          } = this.props;
    const lengthIndex = projects.length - 1;

    const renderItems = (
      <div>
        {projects.map((project, i) => {
            return (<ProjectItem 
                      key={project._id} 
                      project={project} 
                      projectChange={actions.projectsChange}
                      handleDelete={this.handleDelete}
                      saveProjectEdit={this.handleEditSave} 
                      isntLast={lengthIndex !== i} 
                    />);
        })}
      </div>
    )
    
    return ( <div className={cx('projectList--container') + ' col-md-8 col-md-offset-2'}>
      { projects.length ? (
        <div>
          {renderItems}
        </div>
      ) : (
        <span>
          <NullProfItem target="project" />
        </span>
      )}
      { addVisibile ? (
        <ProjectAdd
          project={project}
          onProjectSave={this.handleSave} 
          projectChange={actions.projectChange}
          toggleEdit={this.toggleAddProject.bind(this)} 
          addVisibile={addVisibile}
        />
      ) : (
          <div>
            <FloatingActionButton 
              onClick={this.toggleAddProject}
              className={cx('projectItem--add') + ' pull-right'}
              mini={true}
            >
              <AddIcon />
            </FloatingActionButton>
          </div>
      ) }
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