import {
  reduxGroceryState,
  reduxGroceryAction,
  groceryListItem
} from "../../types/groceryListsType";

const initialState: reduxGroceryState = { groceryList: [] };

function groceryListReducers(
  state: reduxGroceryState = initialState,
  action: reduxGroceryAction
) {
  let nextState: reduxGroceryState;
  let newGroceryList = [...state.groceryList];
  switch (action.type) {
    // Rajouter un item à la liste de courses
    case "ADD_ITEM":
      nextState = {
        ...state,
        groceryList: [...state.groceryList, action.value].sort(
          (a: groceryListItem, b: groceryListItem) => b.index - a.index
        )
      };
      return nextState;

    // Supprimer un item de la liste de courses
    case "DELETE_ITEM":
      newGroceryList = newGroceryList
        .filter(listItem => listItem.item.name != action.value.item.name)
        .map(item => {
          if (item.index > action.value.index) {
            return { ...item, index: item.index - 1 };
          } else {
            return item;
          }
        });
      nextState = {
        ...state,
        groceryList: newGroceryList
      };
      return nextState;

    // Cocher/décocher un élément de la liste de courses
    case "TOGGLE_CHECK":
      const itemId = state.groceryList.findIndex(
        listItem => listItem.item.name == action.value.item.name
      );
      newGroceryList[itemId] = {
        ...newGroceryList[itemId],
        checked: !newGroceryList[itemId].checked
      };
      nextState = {
        ...state,
        groceryList: newGroceryList
      };
      return nextState;

    case "MODIFY_GROCERY_ITEM":
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

    case "DELETE_ALL":
      nextState = {
        ...state,
        groceryList: []
      };
      return nextState;

    // List is sorted in descending order
    case "MOVE_ITEM_DOWN":
      if (action.value.index > 0) {
        let oldIndex = action.value.index;
        let newIndex = action.value.index - 1;
        const indexOfItemGoingDown = state.groceryList.findIndex(
          item => item.index == action.value.index
        );
        const indexOfItemGoingUp = state.groceryList.findIndex(
          item => item.index == action.value.index - 1
        );
        newGroceryList[indexOfItemGoingDown].index = newIndex;
        newGroceryList[indexOfItemGoingUp].index = oldIndex;
        nextState = {
          ...state,
          groceryList: newGroceryList.sort(
            (a: groceryListItem, b: groceryListItem) => b.index - a.index
          )
        };
        return nextState;
      } else {
        return state;
      }

    case "MOVE_ITEM_UP":
      if (action.value.index < state.groceryList.length - 1) {
        let oldIndex = action.value.index;
        let newIndex = action.value.index + 1;
        const indexOfItemGoingUp = state.groceryList.findIndex(
          item => item.index == action.value.index
        );
        const indexOfItemGoingDown = state.groceryList.findIndex(
          item => item.index == action.value.index + 1
        );
        newGroceryList[indexOfItemGoingUp].index = newIndex;
        newGroceryList[indexOfItemGoingDown].index = oldIndex;
        nextState = {
          ...state,
          groceryList: newGroceryList.sort(
            (a: groceryListItem, b: groceryListItem) => b.index - a.index
          )
        };
        return nextState;
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default groceryListReducers;
