type groceryListKey = { string };

type groceryList = {
  [name: string]: groceryListKey;
};

export { groceryList, groceryListKey };
