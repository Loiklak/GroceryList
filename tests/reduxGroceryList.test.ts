import groceryReducer from '../store/reducers/groceryListReducer';

import {
  reduxGroceryState,
  reduxGroceryAction,
  groceryListItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  quantityType,
} from '../types/groceryListsType';

//------- HELPERS FOR THE TESTS --------------

const initialState: reduxGroceryState = { groceryList: [] };

/** Dispatch an action to the given state and return new state */
function dispatch(
  action: reduxGroceryAction,
  state: reduxGroceryState
): reduxGroceryState {
  return groceryReducer(state, action);
}

function createAction(
  type: string,
  value: groceryListItem
): reduxGroceryAction {
  return {
    type: type,
    value: value,
  };
}
/** Create an action to add an item */
function createAddAction(
  name: string,
  state: reduxGroceryState = initialState, // The state to which you add the action (for the index of the new item)
  quantity = 1,
  quantityType: quantityType = 'unité'
): reduxGroceryAction {
  const addAction: reduxGroceryAction = {
    type: 'ADD_ITEM',
    value: {
      item: {
        name: name,
        quantity: quantity,
        quantityType: quantityType,
      },
      checked: false,
      index: state.groceryList.length,
    },
  };
  return addAction;
}

/** Create an actino to delete an item */
function createDeleteAction(item: groceryListItem): reduxGroceryAction {
  const deleteAction: reduxGroceryAction = {
    type: 'DELETE_ITEM',
    value: item,
  };
  return deleteAction;
}

function createUpAction(item: groceryListItem): reduxGroceryAction {
  const upAction: reduxGroceryAction = {
    type: 'MOVE_ITEM_UP',
    value: item,
  };
  return upAction;
}

function createDownAction(item: groceryListItem): reduxGroceryAction {
  const upAction: reduxGroceryAction = {
    type: 'MOVE_ITEM_DOWN',
    value: item,
  };
  return upAction;
}

//----- BEGIN TESTING ---------
test('Add 1 new item', () => {
  const state: reduxGroceryState = dispatch(
    createAddAction('Jambon'),
    initialState
  );
  expect(state.groceryList).toStrictEqual([
    {
      item: {
        name: 'Jambon',
        quantity: 1,
        quantityType: 'unité',
      },
      checked: false,
      index: 0,
    },
  ]);
});

test('Add 5 new item', () => {
  let state = { ...initialState };
  for (const item of ['Jambon', 'Beurre', 'Pain', 'Salade', 'Saucisson']) {
    state = dispatch(createAddAction(item, state), state);
  }
  expect(state.groceryList.length).toBe(5);
});

test('Add 5 new item with the right indexes', () => {
  let state = { ...initialState };
  for (const item of ['Jambon', 'Beurre', 'Pain', 'Salade', 'Saucisson']) {
    state = dispatch(createAddAction(item, state), state);
  }
  expect(state.groceryList.find((item) => item.index === 1).item.name).toBe(
    'Beurre'
  );
  expect(state.groceryList.find((item) => item.index === 4).item.name).toBe(
    'Saucisson'
  );
});

test('Delete an item', () => {
  let state = { ...initialState };
  for (const item of ['Jambon', 'Beurre', 'Pain', 'Salade', 'Saucisson']) {
    state = dispatch(createAddAction(item, state), state);
  }
  expect(state.groceryList.length).toBe(5);

  // delete the item
  const itemToDelete = state.groceryList.find(
    (item) => item.item.name === 'Salade'
  );
  state = dispatch(createDeleteAction(itemToDelete), state);

  expect(state.groceryList.length).toBe(4);
});

test('Delete an item and put indexes right', () => {
  let state = { ...initialState };
  for (const item of ['Jambon', 'Beurre', 'Pain', 'Salade', 'Saucisson']) {
    state = dispatch(createAddAction(item, state), state);
  }
  expect(
    state.groceryList.find((item) => item.item.name === 'Jambon').index
  ).toBe(0);
  expect(
    state.groceryList.find((item) => item.item.name === 'Beurre').index
  ).toBe(1);
  expect(
    state.groceryList.find((item) => item.item.name === 'Pain').index
  ).toBe(2);
  expect(
    state.groceryList.find((item) => item.item.name === 'Salade').index
  ).toBe(3);
  expect(
    state.groceryList.find((item) => item.item.name === 'Saucisson').index
  ).toBe(4);

  // delete the item
  const itemToDelete = state.groceryList.find(
    (item) => item.item.name === 'Pain'
  );
  state = dispatch(createDeleteAction(itemToDelete), state);

  //item before deleted item wasn't moved
  expect(
    state.groceryList.find((item) => item.item.name === 'Jambon').index
  ).toBe(0);
  expect(
    state.groceryList.find((item) => item.item.name === 'Beurre').index
  ).toBe(1);
  // item deleted is deleted alright
  expect(state.groceryList.find((item) => item.item.name === 'Pain')).toBe(
    undefined
  );
  //item after deleted item was moved
  expect(
    state.groceryList.find((item) => item.item.name === 'Salade').index
  ).toBe(2);
  expect(
    state.groceryList.find((item) => item.item.name === 'Saucisson').index
  ).toBe(3);
});

test('Move an item up', () => {
  let state = { ...initialState };
  for (const item of ['Jambon', 'Beurre', 'Pain', 'Salade', 'Saucisson']) {
    state = dispatch(createAddAction(item, state), state);
  }

  const itemToMoveUp = state.groceryList.find(
    (item) => item.item.name === 'Pain'
  );
  expect(state.groceryList.find((item) => item.index == 2)).toStrictEqual(
    itemToMoveUp
  );
  const itemToMoveDown = state.groceryList.find((item) => item.index == 3);
  expect(itemToMoveDown.item.name).toBe('Salade');

  state = dispatch(createUpAction(itemToMoveUp), state);

  const indexOfMovedUpItem = state.groceryList.findIndex(
    (item) => item.item.name === 'Pain'
  );
  const indexOfMovedDownItem = state.groceryList.findIndex(
    (item) => item.item == itemToMoveDown.item
  );
  expect(state.groceryList[indexOfMovedDownItem].index).toBe(2);
  expect(state.groceryList[indexOfMovedUpItem].index).toBe(3);
});

test("Don't move an item up if it is at the top", () => {
  let state = { ...initialState };
  for (const item of ['Jambon', 'Beurre', 'Pain', 'Salade', 'Saucisson']) {
    state = dispatch(createAddAction(item, state), state);
  }

  const itemToMoveUp = state.groceryList.find(
    (item) => item.item.name === 'Saucisson'
  );

  expect(itemToMoveUp.index).toBe(4);

  state = dispatch(createUpAction(itemToMoveUp), state);

  expect(
    state.groceryList.find((item) => item.item.name === 'Saucisson').index
  ).toBe(4);
});

test('Move an item down', () => {
  let state = { ...initialState };
  for (const item of ['Jambon', 'Beurre', 'Pain', 'Salade', 'Saucisson']) {
    state = dispatch(createAddAction(item, state), state);
  }

  const itemToMoveDown = state.groceryList.find(
    (item) => item.item.name === 'Pain'
  );
  expect(state.groceryList.find((item) => item.index == 2)).toStrictEqual(
    itemToMoveDown
  );
  const itemToMoveUp = state.groceryList.find((item) => item.index == 1);
  expect(itemToMoveUp.item.name).toBe('Beurre');

  state = dispatch(createDownAction(itemToMoveDown), state);

  const indexOfMovedDownItem = state.groceryList.findIndex(
    (item) => item.item.name === 'Pain'
  );
  const indexOfMovedUpItem = state.groceryList.findIndex(
    (item) => item.item == itemToMoveUp.item
  );
  expect(state.groceryList[indexOfMovedDownItem].index).toBe(1);
  expect(state.groceryList[indexOfMovedUpItem].index).toBe(2);
});

test("Don't move an item down if it is at the bottom", () => {
  let state = { ...initialState };
  for (const item of ['Jambon', 'Beurre', 'Pain', 'Salade', 'Saucisson']) {
    state = dispatch(createAddAction(item, state), state);
  }

  const itemToMoveDown = state.groceryList.find(
    (item) => item.item.name === 'Jambon'
  );

  expect(itemToMoveDown.index).toBe(0);

  state = dispatch(createDownAction(itemToMoveDown), state);

  expect(
    state.groceryList.find((item) => item.item.name === 'Jambon').index
  ).toBe(0);
});

test('Delete all', () => {
  let state = { ...initialState };
  for (const item of ['Jambon', 'Beurre', 'Pain', 'Salade', 'Saucisson']) {
    state = dispatch(createAddAction(item, state), state);
  }
  expect(state.groceryList.length).toBe(5);
  state = dispatch(createAction('DELETE_ALL', null), state);
  expect(state.groceryList.length).toBe(0);
});

test('Toggle checkboxes', () => {
  let state = { ...initialState };
  for (const item of ['Jambon', 'Beurre', 'Pain', 'Salade', 'Saucisson']) {
    state = dispatch(createAddAction(item, state), state);
  }
  expect(state.groceryList[0].checked).toBe(false);
  state = dispatch(createAction('TOGGLE_CHECK', state.groceryList[0]), state);
  expect(state.groceryList[0].checked).toBe(true);
  state = dispatch(createAction('TOGGLE_CHECK', state.groceryList[0]), state);
  expect(state.groceryList[0].checked).toBe(false);
});

test('Modify item', () => {
  let state = { ...initialState };
  state = dispatch(createAddAction('Chips', state, 5, 'unité'), state);
  expect(state.groceryList[0].item.name).toBe('Chips');
  expect(state.groceryList[0].item.quantity).toBe(5);
  expect(state.groceryList[0].item.quantityType).toBe('unité');
  expect(state.groceryList[0].checked).toBe(false);
  expect(state.groceryList[0].index).toBe(0);

  state = dispatch(
    createAction('MODIFY_GROCERY_ITEM', {
      checked: true,
      index: 2,
      item: {
        name: 'Chips',
        quantityType: 'g',
        quantity: 10,
      },
    }),
    state
  );

  expect(state.groceryList[0].item.quantity).toBe(10);
  expect(state.groceryList[0].item.quantityType).toBe('g');
  expect(state.groceryList[0].checked).toBe(false);
  expect(state.groceryList[0].index).toBe(0);
  expect(state.groceryList.length).toBe(1);
});
