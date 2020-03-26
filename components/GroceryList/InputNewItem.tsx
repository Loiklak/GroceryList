import React from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";
import { Input, Button, Tooltip, Text, Icon } from "react-native-elements";
import { connect } from "react-redux";

export default connect()(function InputNewItem(props: any) {
  const [newListName, setNewListName] = React.useState("");

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
        containerStyle={{ width: "85%" }}
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
    alignItems: "center",
    marginTop: 10
  }
});
