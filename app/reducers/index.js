import { combineReducers } from 'redux';
import user from 'reducers/user';
import topic from 'reducers/topic';
import profile from 'reducers/profile';
import message from 'reducers/message';
import job from 'reducers/job';
import school from 'reducers/school';
import typeahead from 'reducers/typeahead';
import skill from 'reducers/skill';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  topic,
  message,
  job,
  routing,
  profile,
  school,
  typeahead,
  skill
});

export default rootReducer;
