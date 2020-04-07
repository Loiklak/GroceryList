import React from 'react';
import Navigator from './components/Navigation/Navigator';
import { NavigatorScreenItem } from './components/Navigation/NavigationTypes';
import { Provider } from 'react-redux';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

import Home from './components/Home';
import GroceryListsList from './components/GroceryListsList/GroceryListsList';
import GroceryList from './components/GroceryList/GroceryList';

const pages: NavigatorScreenItem[] = [
  /* { name: "Home", component: Home },
  { name: "Mes listes de course", component: GroceryListsList }, */
  { name: 'Ma liste de courses', component: GroceryList },
];

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator pages={pages} />
      </PersistGate>
    </Provider>
  );
}
