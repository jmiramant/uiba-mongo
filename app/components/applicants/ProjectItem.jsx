import React, { PropTypes } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import LinkIcon from 'material-ui/svg-icons/content/link';

import moment from 'moment';
import classNames from 'classnames/bind';
import styles from 'css/components/profile/project';
const cx = classNames.bind(styles);

export default class ProjectItem extends React.Component {
  
  static propTypes = {
    project: PropTypes.object.isRequired, 
  }

  constructor(props) {
    super(props);
  }

  render () {
    const { 
      project, 
    } = this.props;

    let descId = 0;

    return (
      <div className={cx('projectItem--container')}>
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
};