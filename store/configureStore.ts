import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import groceryListReducers from './reducers/groceryListReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, groceryListReducers);

const store = createStore(persistedReducer);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistor = persistStore(store as any);

export { store, persistor };
