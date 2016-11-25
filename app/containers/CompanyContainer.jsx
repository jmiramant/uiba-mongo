import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';

import FlatButton from 'material-ui/FlatButton';
import Loader from 'components/Loader';
import Divider from 'material-ui/Divider';
import {
  Step,
  Stepper,
  StepLabel,
  StepButton,
} from 'material-ui/Stepper';

import classNames from 'classnames/bind';
import styles from 'css/components/company/companyAdminContainer';
import * as companyActionCreators from 'actions/companies'
import * as profileActionCreators from 'actions/profiles'

const cx = classNames.bind(styles);


class CompanyContainer extends React.Component {

  componentWillMount() {
    this.props.profileActions.fetchProfile();
  }

  componentDidUpdate(next) {
    const {
      profile,
      company,
      companyActions
    } = this.props;

    if (profile && profile.company_id && company && !company._id) {
      companyActions.fetchCompany(profile.company_id);
    }

    if (this.state.child !== this.props.children.props.location.pathname) {
      this.setState({child: this.props.children.props.location.pathname})
      this.stepHandler(this.props.children.props.location.pathname);
    }
  }
  
  stepHandler(child) {
    const _child = child.split('/')[2]
    switch (_child) {
      case "dashboard":
        return [1];
      case "applicants":
        return [1,2];
      case "applicant":
        return [1,2,3];
    }

  }

  stepNavHandler(i) {
    if (i === 0) this.props.navigate('/company-admin/dashboard')
    if (i === 1 && this.props.children.props.location.pathname !== 'applicants') this.props.history.goBack();
  }

  state = {
    child: this.props.children.props.location.pathname
  }

  render() {

    const {
      profile,
      addShow,
      children,
      company
    } = this.props;
    
    const steps = this.stepHandler(children.props.location.pathname);
    const stepNames = ['Dashboard', 'Applicants List', 'Applicants Profile'];

    return (
      <div className={cx('companyAdmin-container') + ' container'}>

        { profile.company_id && company._id ? (
          <div className={cx('portal-title')}>{company.name} Admin Portal</div>
        ) : (null)}

        <div className={cx('container-card') + ' col-md-12'}>
          { profile.company_id && company._id ? (
            <div>
              { steps && steps.length > 1 ? (
                <span>
                <Stepper
                  linear={false}
                  style={{width: '50%', margin: '-12px auto 0', height: '40px'}}
                >

                  {steps.map( (step, i) => {
                    return (<Step key={i + stepNames[i]} active={true}>
                        <StepButton style={{height: '40px'}} onClick={() => {this.stepNavHandler(i)} }>
                          <StepLabel style={{marginTop: '-15px'}}>{stepNames[i]}</StepLabel>
                        </StepButton>
                    </Step>)
                    }) 
                  }

                </Stepper>
                <Divider />
                </span>
              ) : (null)}
              {children}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
};

CompanyContainer.propTypes = {
  company: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    company: state.company.company,
    addShow: state.company.addShow,
    profile: state.profile.profile
  };
}

function mapDispatchToProps (dispatch) {
  return {
    navigate: (path) => { dispatch(push(path)) },
    companyActions: bindActionCreators(companyActionCreators, dispatch),
    profileActions: bindActionCreators(profileActionCreators, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyContainer);