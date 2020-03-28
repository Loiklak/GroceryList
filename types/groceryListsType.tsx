type groceryList = {
  name: string;
  icon: string;
};

type quantityType = "kg" | "g" | "unité" | "L" | "cL" | "bouteille";

type groceryItem = {
  name: string;
  quantity: number;
  quantityType: quantityType;
};

type groceryListItem = {
  item: groceryItem;
  checked: boolean;
};

type reduxGroceryState = {
  groceryList: groceryListItem[];
};

type reduxGroceryAction = {
  type: string;
  value: groceryListItem;
};

export {
  groceryList,
  groceryItem,
  groceryListItem,
  reduxGroceryState,
  reduxGroceryAction,
  quantityType
};
