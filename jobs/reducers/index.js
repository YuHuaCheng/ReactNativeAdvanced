import { combineReducers } from 'redux';

import auth from './auth_reducers';
import jobs from './jobs_reducer';

export default combineReducers({
    auth, jobs
});