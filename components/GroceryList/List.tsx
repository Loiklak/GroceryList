import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Text, CheckBox } from "react-native-elements";

import {
  groceryListItem,
  reduxGroceryState
} from "../../types/groceryListsType";

const mapStateToProps = function(
  state: reduxGroceryState
): { groceryList: groceryListItem[] } {
  return {
    groceryList: state.groceryList
  };
};

export default connect(mapStateToProps)(function List(props: any) {
  function formatGroceryName(item: groceryListItem) {
    const accordEnNombre = item.item.quantity > 1 ? "s" : "";
    const quantity =
      item.item.quantityType == "unité" || item.item.quantityType == "bouteille"
        ? `${item.item.quantity}`
        : `${item.item.quantity}${item.item.quantityType} de`;
    return `${quantity} ${item.item.name}`;
  }

  function deleteItem(itemName) {
    return () => {
      const action = {
        type: "DELETE_ITEM",
        value: props.groceryList.find(item => (item.name = itemName))
      };
      props.dispatch(action);
    };
  }

  function toggleCheck(itemName) {
    return () => {
      const action = {
        type: "TOGGLE_CHECK",
        value: props.groceryList.find(item => (item.name = itemName))
      };
      props.dispatch(action);
    };
  }

  return (
    <View style={styles.container}>
      <Text h4 style={{ textAlign: "center", marginBottom: 5 }}>
        Liste
      </Text>
      {props.groceryList
        .sort((a: groceryListItem, b: groceryListItem) => {
          return a.checked ? 1 : b.checked ? -1 : 0;
        })
        .map((l: groceryListItem, i: number) => (
          <CheckBox
            key={i}
            title={formatGroceryName(l)}
            checked={l.checked}
            onLongPress={deleteItem(l.item.name)}
            onPress={toggleCheck(l.item.name)}
          />
        ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10
  }
});
