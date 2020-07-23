import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authReducer';
import spinReducer from './spinReducer';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';

// Persists our reducers
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'form', 'loadingBar'],
  blacklist: ['spin']
};

const rootReducer = combineReducers({
  session: authReducer,
  spin: spinReducer,
  form: formReducer,
  loadingBar: loadingBarReducer
});

export default persistReducer(persistConfig, rootReducer);
