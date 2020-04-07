import AsyncStorage from '@react-native-community/async-storage';
import { groceryList, groceryListKey } from './storageTypes';

const getData = async (storage_key: string) => {
  try {
    const value = await AsyncStorage.getItem(storage_key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    throw e;
  }
};

const storeData = async (storage_key: string, storage_data: string) => {
  try {
    await AsyncStorage.setItem(storage_key, storage_data);
  } catch (e) {
    throw e;
  }
};

const mergeData = async (storage_key: string, storage_data_to_add: string) => {
  try {
    await AsyncStorage.mergeItem(storage_key, storage_data_to_add);
  } catch (e) {
    throw e;
  }
};

function addNewGroceryList(name: string) {
  const newData = {
    GroceryLists: {
      name: name,
    },
  };
}
