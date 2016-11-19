import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';

import FlatButton from 'material-ui/FlatButton';
import Loader from 'components/Loader';
import {
  Step,
  Stepper,
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

    if (this.state.child !== this.props.children.type.WrappedComponent.displayName) {
      this.setState({child: this.props.children.type.WrappedComponent.displayName})
      this.stepHandler();
    }
  }
  
  stepHandler(child) {
    switch (child) {
      case "CompanyDashboard":
        return [1];
      case "ApplicantList":
        return [1,2];
      case "ApplicantShow":
        return [1,2,3];
    }

  }

  stepNavHandler(i) {
    if (i === 0) this.props.navigate('/company-admin/dashboard')
    if (i === 1 && this.props.children.type.WrappedComponent.displayName !== 'ApplicantList') this.props.history.goBack();
  }

  state = {
    child: this.props.children.type.WrappedComponent.displayName
  }

  render() {

    const {
      profile,
      addShow,
      children,
      company
    } = this.props;
    
    const steps = this.stepHandler(children.type.WrappedComponent.displayName);
    const stepNames = ['Dashboard', 'Applicants List', 'Applicants Profile'];

    return (
      <div className={cx('companyAdmin-container') + ' container'}>

        { profile.company_id && company._id ? (
          <div className={cx('portal-title')}>{company.name} Admin Portal</div>
        ) : (null)}

        { steps.length > 1 ? (
          <Stepper 
            linear={false}
            style={{width: '50%', margin: '0 auto'}}
          >

            {steps.map( (step, i) => {
              return (<Step key={i + stepNames[i]} active={true}>
                  <StepButton onClick={() => {this.stepNavHandler(i)} }>
                    {stepNames[i]}
                  </StepButton>
              </Step>)
              }) 
            }

          </Stepper>
        ) : (null)}

        <div className={cx('container-card') + ' col-md-12'}>
          { profile.company_id && company._id ? (
            <div>
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