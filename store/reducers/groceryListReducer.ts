import {
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
        ...newGroceryList[itemId],
        checked: !newGroceryList[itemId].checked
      };
      nextState = {
        ...state,
        groceryList: newGroceryList
      };
      return nextState;

    case "MODIFY_GROCERYITEM":
      const itemIdQty = state.groceryList.findIndex(
        listItem => listItem.item.name == action.value.item.name
      );
      const newGroceryListQty = [...state.groceryList];
      newGroceryListQty[itemIdQty] = {
        ...newGroceryListQty[itemIdQty],
        item: action.value.item
      };
      nextState = {
        ...state,
        groceryList: newGroceryListQty
      };
      return nextState;

    default:
      return state;
  }
}

export default groceryListReducers;
