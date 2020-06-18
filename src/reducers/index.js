import { combineReducers } from 'redux';
import authReducer from './authReducer';
import spinReducer from './spinReducer';

export default combineReducers({ auth: authReducer, spin: spinReducer });
