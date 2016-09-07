import React, { PropTypes } from 'react';

// import { validateUserCardHelper } from '../helpers/skillValidations';

import classNames from 'classnames/bind';
import styles from 'css/components/profile/skill';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';
import _ from 'lodash';

const cx = classNames.bind(styles);

export default class UserCardEdit extends React.Component {
  
  static propTypes = {
    profile: PropTypes.object.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    onEditSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  state = {
    validationErrors: {}
  }
  
  handleSubmit = e => {
    e.preventDefault();
    if (!this.validate()) {
      this.props.onEditSave(this.props.profile);
    }
  }
  
  validate() {
    // const errorStore = validateUserCardHelper(this.props.skill, this.state.validationErrors);
    // this.setState({validationErrors: errorStore.errors});
    // return errorStore.containsErrors;
    return false
  }

  handleChange = field => (e, i, val) => {
    const value = (val ? val : i)

    this.props.profileChange({
      field: field,
      value: value,
      id: this.props.profile._id
    });   

  }

  render () {
    
    const {
            validationErrors
          } = this.state;

    const {
            profile,
          } = this.props;

    return (
      <div>
        <form
          className={cx('userEdit--form')}
          onSubmit={this.handleSubmit}
        >
           <TextField
            value={profile.name}
            errorText={validationErrors.name}
            floatingLabelText="Name"
            onChange={this.handleChange('name')}
          />

           <TextField
            value={profile.headline}
            errorText={validationErrors.headline}
            floatingLabelText="Headline"
            onChange={this.handleChange('headline')}
          />
          
          <div className={cx('profile-btn-group')}>
            <RaisedButton className='pull-right' type="submit" label="Save" primary={true} />
            <FlatButton className='pull-left' label="Close" onClick={this.props.toggleEdit} primary={true} />
          </div>

        </form>
      </div>
    )
  }
};