import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

import groceryListReducers from "./reducers/groceryListReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, groceryListReducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };
