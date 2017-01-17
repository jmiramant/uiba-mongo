import React, { PropTypes } from 'react';

import ProjectAdd from 'components/projects/ProjectAdd';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import LinkIcon from 'material-ui/svg-icons/content/link';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/project';
const cx = classNames.bind(styles);

export default class ProjectItem extends React.Component {
  
  static propTypes = {
    project: PropTypes.object.isRequired, 
    projectChange: PropTypes.func.isRequired,
    saveProjectEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  state = {
    validationErrors: {},
  }

  toggleEdit () {
    this.props.toggleEdit(this.props.project);
  }

  saveEdit (project) {
    this.props.saveProjectEdit(project)
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

    let descId = 0;

    if (project.edit) {

      return (
        <ProjectAdd
          project={project}
          projectChange={projectChange}
          addVisible={false}
          onProjectSave={this.saveEdit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)}
        />
      )
    
    } else {

      return (
        <div className={cx('projectItem--container')} onDoubleClick={this.toggleEdit.bind(this)}>
          <EditIcon
            color="#66747F"
            hoverColor="#f20253"
            onClick={this.toggleEdit.bind(this)}
            className={cx("projectItem--edit") + ' pull-right'}
          />
          <h4 
            className={cx("projectItem--header")}
          >
            {project.name} { (project.projectUrl && project.projectUrl.length > 0) ? (
                <a 
                  href={project.projectUrl}
                  target="_blank">
                    <LinkIcon
                      hoverColor="#f20253"
                      className={cx('projectItem--link')}
                    />
                </a>
              ) : (null)}
          </h4>
          <p className={cx("projectItem--date", 'date')}> { 
              moment(project.startDate).format('MMM, YYYY')
            } - { 
              project.current ? ( 
                'Current' 
              ) : ( 
                moment(project.endDate).format('MMM, YYYY')) 
            } 
          </p>
          <div className={cx('projectItem--description')}>
          {project.description.split('\n').map((item) => {
            let key = project._id + item + descId
            return (
              <span key={key}>{item}<br/></span>
            )
            descId++
          })}</div>
        </div>
      )

    }
  
  }
};