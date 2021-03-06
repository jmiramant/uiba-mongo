import { combineReducers } from 'redux';
import user from 'reducers/user';
import topic from 'reducers/topic';
import profile from 'reducers/profile';
import message from 'reducers/message';
import job from 'reducers/job';
import school from 'reducers/school';
import language from 'reducers/language';
import interest from 'reducers/interest';
import project from 'reducers/project';
import typeahead from 'reducers/typeahead';
import skill from 'reducers/skill';
import company from 'reducers/company';
import confirmation from 'reducers/confirmation';
import address from 'reducers/address';
import role from 'reducers/role';
import applicant from 'reducers/applicant';
import score from 'reducers/score';
import filter from 'reducers/filter';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  user,
  topic,
  message,
  interest,
  job,
  routing,
  profile,
  school,
  typeahead,
  language,
  project,
  skill,
  confirmation,
  company,
  address,
  role,
  applicant,
  score,
  filter,
});

export default rootReducer;
