import { createStore } from "redux";
import addItem from "./reducers/groceryListReducer";

export default createStore(addItem);
