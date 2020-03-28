import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import { Text } from "react-native-elements";
import ListItem from "./ListItem";

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
  const [liftDropList, setLiftDropList] = React.useState([]);
  function liftDrops() {
    liftDropList.forEach(liftDrop => liftDrop());
    setLiftDropList([]);
  }
  function addLiftDrop(newLiftDrop) {
    if (liftDropList.length > 0) {
      liftDrops();
    }
    setLiftDropList([...liftDropList, newLiftDrop]);
  }

  return (
    <TouchableWithoutFeedback onPress={liftDrops}>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            margin: 5,
            fontSize: 30
          }}
        >
          Liste
        </Text>
        {props.groceryList
          .sort((a: groceryListItem, b: groceryListItem) => {
            return a.checked ? 1 : b.checked ? -1 : 0;
          })
          .map((l: groceryListItem) => (
            <ListItem
              listItem={l}
              key={l.item.name}
              addLiftDrop={addLiftDrop}
            />
          ))}
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
    backgroundColor: "rgba(256, 256, 256, 0.9)",
    borderRadius: 10
  }
});
