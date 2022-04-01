import { combineReducers } from 'redux';

import userReducer from './User/reducer';
import updateMessageReducer from './Message/reducer';

const rootReducers = combineReducers({
  user: userReducer,
  msgContainer: updateMessageReducer,
});

export default rootReducers;
