const initialState = { groceryList: [] };

function addItem(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "ADD_ITEM":
      nextState = {
        ...state,
        groceryList: [...state.groceryList, action.value]
      };
      return nextState;
    default:
      return state;
  }
}

export default addItem;
