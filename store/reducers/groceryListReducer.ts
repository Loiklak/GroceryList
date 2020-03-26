const initialState = { groceryList: [] };

function groceryListReducers(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "ADD_ITEM":
      nextState = {
        ...state,
        groceryList: [...state.groceryList, action.value]
      };
      return nextState;
    case "DELETE_ITEM":
      nextState = {
        ...state,
        groceryList: state.groceryList.filter(item => item != action.value)
      };
      return nextState;
    default:
      return state;
  }
}

export default groceryListReducers;
