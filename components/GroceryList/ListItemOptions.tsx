import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Input } from "react-native-elements";

type ListItemOptionsProps = {
  deleteItem: () => void;
  modifyQuantity: (newQuantity: number) => void;
  moveItem: (direction: "up" | "down") => void;
  quantity: number;
};

export default function ListItemOptions(props: ListItemOptionsProps) {
  function modifyQuantity(delta: number) {
    props.modifyQuantity(props.quantity + delta);
  }

  return (
    <View style={styles.row}>
      <View style={styles.leftSide}>
        <Input
          placeholder="Quantité"
          containerStyle={{ width: 100 }}
          keyboardType="numeric"
          onChangeText={text =>
            text == ""
              ? props.modifyQuantity(0)
              : props.modifyQuantity(parseInt(text))
          }
          value={props.quantity == 0 ? null : String(props.quantity)}
        />
        <Icon
          type="material"
          name="add"
          color="gray"
          size={20}
          reverse
          onPress={() => modifyQuantity(1)}
        />
        <Icon
          type="material"
          name="remove"
          color="gray"
          size={20}
          reverse
          onPress={() => modifyQuantity(-1)}
        />
      </View>
      <View style={styles.rightSide}>
        <Icon
          type="font-awesome"
          name="sort-up"
          color="gray"
          size={20}
          reverse
          onPress={() => props.moveItem("up")}
        />
        <Icon
          type="font-awesome"
          name="sort-down"
          color="gray"
          size={20}
          reverse
          onPress={() => props.moveItem("down")}
        />
        <Icon
          type="material"
          name="delete"
          color="red"
          size={20}
          reverse
          onPress={props.deleteItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%"
  },
  leftSide: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    alignItems: "center"
  },
  rightSide: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1
  }
});
