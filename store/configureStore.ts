import { createStore } from "redux";
import groceryListReducers from "./reducers/groceryListReducer";

export default createStore(groceryListReducers);
