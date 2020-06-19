import { combineReducers } from 'redux';
import authReducer from './authReducer';
import spinReducer from './spinReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({ auth: authReducer, spin: spinReducer, form: formReducer });
