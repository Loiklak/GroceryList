import React from "react";
import Navigator from "./components/Navigation/Navigator";
import { NavigatorScreenItem } from "./components/Navigation/NavigationTypes";

import Home from "./components/Home";
import GroceryListsList from "./components/GroceryListsList/GroceryListsList";

const pages: NavigatorScreenItem[] = [
  { name: "Home", component: Home },
  { name: "Mes listes de course", component: GroceryListsList }
];

export default function App() {
  return <Navigator pages={pages} />;
}
