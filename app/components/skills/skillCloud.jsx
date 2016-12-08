import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import Popover from 'material-ui/Popover/Popover';
import styles from 'css/components/profile/skillCloud';
import classNames from 'classnames/bind';
import Divider from 'material-ui/Divider';

const cx = classNames.bind(styles);

export default class SkillCloud extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    skills: []
  };
  
  componentDidMount() {
    const skillExamples = ["Algorithm Design", "Android App Development", "Applied Physics", "Business Analysis", "Business Intelligence", "Channel Marketing", "Classroom Management", "Coaching", "Conflict Resolution", "Content Marketing", "Corporate Law", "Creative Thinking", "Critical Thinking", "Data Analytics", "Data Presentation", "Data Science", "Database Administration", "Distributed computing", "Economics", "Editing", "Effective Communication", "Event Planning", "Financial Analysis", "Financial Management", "Fundraising", "Game Development", "General Ledger Accounting", "Geology", "Hadoop", "Initiative", "JavaScript", "Leadership ", "Logistics Planning", "Management ", "Management Consulting", "Market Research ", "Media Planning", "Mentoring", "Microsoft Office Skills", "Negotiation", "Network and Information Security", "Node.js", "Petroleum Extraction", "Presentation", "Project Management", "Public  Relations", "Python", "Recruiting", "Relationship Management", "Risk Management", "SCADA", "Social Media Management", "Software QA", "Statistical Analysis ", "Strategic Planning ", "Training", "Troubleshooting", "User Interface Design", "User Testing", "Writing"];
    const s = _.sampleSize(skillExamples, 10);
    this.setState({skills: s});
  }

  render () {

    const { inputFocus } = this.props;
    const { skills } = this.state;
    
    const cloud = (
      <div className={cx('skill-cloud-container')}>
        <div className={cx('cloud-container')}>
          <h5 className={cx('title')}>
            Some examples skills...
          </h5>
          <Divider
            style={{marginBottom: '10px'}}
          />
          {skills.map( (s, i) => {
            return (<Chip
                      style={{display: 'inline-block', margin: '2px', backgroundColor: '#fff'}}
                      labelStyle={{fontSize: '12px', color: '#666666'}}
                      key={s + i}
                    >{s}</Chip>)
          })}
        </div>
      </div>
    )

    return (
      <span>
        {inputFocus ? (cloud) : (null)}
      </span>

    )

  
  }
};