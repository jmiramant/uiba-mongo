import { combineReducers } from 'redux';
import user from 'reducers/user';
import topic from 'reducers/topic';
import profile from 'reducers/profile';
import message from 'reducers/message';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  topic,
  message,
  routing,
  profile
});

export default rootReducer;
