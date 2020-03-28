import React from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";
import { Input, Button, Tooltip, Text, Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";

import { connect } from "react-redux";

import { quantityType } from "../../types/groceryListsType";

export default connect()(function InputNewItem(props: any) {
  const [newListName, setNewListName] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [quantityType, setQuantityType] = React.useState<quantityType>("qté");

  const quantityTypes = [
    { value: "qté" },
    { value: "kg" },
    { value: "g" },
    { value: "L" },
    { value: "cL" }
  ];

  function addItem() {
    if (newListName != "") {
      Keyboard.dismiss();
      const action = { type: "ADD_ITEM", value: newListName };
      props.dispatch(action);
      setNewListName("");
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nouvel article"
        onChangeText={text => setNewListName(text)}
        value={newListName}
        onSubmitEditing={addItem}
        containerStyle={{ width: "100%" }}
      />
      <Input
        placeholder="Quantité"
        onChangeText={text =>
          text == "" ? setQuantity(0) : setQuantity(parseInt(text))
        }
        keyboardType="numeric"
        value={quantity == 0 ? null : String(quantity)}
        onSubmitEditing={addItem}
        containerStyle={{ width: "30%" }}
      />
      <Dropdown
        label="Type de qté"
        data={quantityTypes}
        containerStyle={{ width: "40%" }}
      />
      <Tooltip popover={<Text>Ajoute un article !</Text>} toggleOnPress={true}>
        <Icon
          type="font-awesome"
          name="plus-square"
          color="#b8eb9b"
          size={20}
          reverse
          onPress={addItem}
        />
      </Tooltip>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    flexWrap: "wrap",
    marginTop: 10
  }
});
