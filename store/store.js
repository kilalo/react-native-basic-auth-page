import { createStore } from 'redux';
import toggleLogin from './reducers/reducers'
import { persistCombineReducers } from 'redux-persist'
import { AsyncStorage } from 'react-native';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

  export default createStore(persistCombineReducers(rootPersistConfig, { toggleLogin }))