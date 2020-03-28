import {
  groceryListItem,
  reduxGroceryState,
  reduxGroceryAction
} from "../../types/groceryListsType";

const initialState: reduxGroceryState = { groceryList: [] };

function groceryListReducers(
  state: reduxGroceryState = initialState,
  action: reduxGroceryAction
) {
  let nextState: reduxGroceryState;
  switch (action.type) {
    // Rajouter un item à la liste de courses
    case "ADD_ITEM":
      nextState = {
        ...state,
        groceryList: [...state.groceryList, action.value]
      };
      return nextState;

    // Supprimer un item de la liste de courses
    case "DELETE_ITEM":
      nextState = {
        ...state,
        groceryList: state.groceryList.filter(
          listItem => listItem.item.name != action.value.item.name
        )
      };
      return nextState;

    // Cocher/décocher un élément de la liste de courses
    case "TOGGLE_CHECK":
      const itemId = state.groceryList.findIndex(
        listItem => listItem.item.name == action.value.item.name
      );
      const newGroceryList = [...state.groceryList];
      newGroceryList[itemId] = {
        item: action.value.item,
        checked: !newGroceryList[itemId].checked
      };
      nextState = {
        ...state,
        groceryList: newGroceryList
      };
      return nextState;

    default:
      return state;
  }
}

export default groceryListReducers;
