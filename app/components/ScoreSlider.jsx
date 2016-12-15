import React, { PropTypes } from 'react';
import Popover from 'material-ui/Popover';
import DuelSlider from 'components/DuelSlider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames/bind';

import roleStyles from 'css/components/role';
import styles from 'css/components/applicantFilter';
const cx = classNames.bind(roleStyles);
const cy = classNames.bind(styles);

export default class ScoreSlider extends React.Component {
  
  static PropTypes =  {
    role: PropTypes.object.isRequired,
    scoreFilter: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  state = {
    score: { open: false, anchorEl: null },
    min: 0,
    max: 0
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.setInitialRangeState()
  }

  setInitialRangeState() {
    const { scoreFilter } = this.props;
    let min = 0;
    let max = 100;
    if (scoreFilter && scoreFilter.min) min = scoreFilter.min;
    if (scoreFilter && scoreFilter.max) max = scoreFilter.max;
    this.setState({min, max});
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  sliderChange(val) {
    this.setState({min: val[0], max: val[1]});
  }

  openExperience(e) {
    const sty = this.getAnchorPosition(e.currentTarget)
    this.setState({ score: {
        open: true,
        anchorEl: e.currentTarget,
        style: {
          top: sty.top - 152,
          left: sty.left
        }
      }
    });
  }

  getAnchorPosition(el) {
    if (!el) {
      el = ReactDOM.findDOMNode(this);
    }

    const rect = el.getBoundingClientRect();
    const a = {
      top: rect.top,
      left: rect.left,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };

    a.right = rect.right || a.left + a.width;
    a.bottom = rect.bottom || a.top + a.height;
    a.middle = a.left + ((a.right - a.left) / 2);
    a.center = a.top + ((a.bottom - a.top) / 2);

    return a;
  }

  changeProjectProps(field, value) {
    // this.setState({validationErrors: {}})
    // this.props.roleChange({
    //   field: field,
    //   value: value,
    //   id: this.props.role._id
    // });
  }

  scoreReposition() {
    if (this.state.score.anchorEl) {
      const sty = this.getAnchorPosition(this.state.score.anchorEl)
      this.setState({ score: {
          open: true,
          anchorEl: this.state.score.anchorEl,
          style: {
            top: sty.top - 152,
            left: sty.left
          }
        }
      });
    } else {
      return false;
    }
  }

  handleResize = () => {
    this.scoreReposition();
  };

  setScore () {
    this.props.onSet({score: {min: this.state.min, max: this.state.max}});
    this.closePopover();
  }

  handleScroll = () => {
    this.scoreReposition()
  };
  
  closePopover = (popover) => {
    this.setState({
      score: {
        open: false, 
        anchorEl: null 
      }
    })
  }

  render() {
    const {
      role,
      scoreFilter
    } = this.props;

    const {
      min,
      max,
      score
    } = this.state;

    return (
      <div className={cx('req-btns') +" col-md-3"}>
        <RaisedButton
          labelStyle={{fontSize: '10px', paddingLeft: '9px', paddingRight: '9px'}}
          onClick={(e) => {this.openExperience(e)}}
          label='Role Score'
          style={{width: "100%"}}
        />
        {score.open ? (
          <div className={cx('experience-selector')}>
              <h5 className={cx('experience-title')}>Role Score Range</h5>
              <DuelSlider
                min={min}
                max={max}
                dataSource={[role.experienceMin, role.experienceMax]}
                title="Length of Use (Yrs)"
                field={'lengthOfUse'}
                style={{width: '90%', zIndex: 100}}
                handleChange={this.sliderChange.bind(this)}
                storeValue={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                stages={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
              >
                <div className="handle handle-0"/>
                <div className="handle handle-1"/>
              </DuelSlider>
              
              <FlatButton className='pull-right' label="set" onClick={this.setScore.bind(this)} primary={true} />
              <FlatButton className='pull-right' label="close" onClick={() => {this.closePopover('score')}} primary={true} />
            </div>
          ) : (null)}
          {scoreFilter && scoreFilter.min >= 0 && scoreFilter.max ? (
            <div className={cy('enabled-filters', 'enabled-filter-item', 'skill-filter')}>Applicants with a role score of <span className={cy('strong')}>{scoreFilter.min} minimum</span> and of <span className={cy('strong')}>{scoreFilter.max} maximum</span></div>
          ) : (null)}
      </div>
    )
  }
};