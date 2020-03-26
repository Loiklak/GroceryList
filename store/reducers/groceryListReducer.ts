import GroceryList from "../../components/GroceryList/GroceryList";

const initialState = { groceryList: [] };

function groceryListReducers(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "ADD_ITEM":
      nextState = {
        ...state,
        groceryList: [
          ...state.groceryList,
          { name: action.value, checked: false }
        ]
      };
      return nextState;

    case "DELETE_ITEM":
      nextState = {
        ...state,
        groceryList: state.groceryList.filter(item => item.name != action.value)
      };
      return nextState;

    case "TOGGLE_CHECK":
      const itemId = state.groceryList.findIndex(
        item => item.name == action.value
      );
      const newGroceryList = [...state.groceryList];
      newGroceryList[itemId] = {
        name: action.value,
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
