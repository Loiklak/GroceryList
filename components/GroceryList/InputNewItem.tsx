import React from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(function InputNewItem(props: any) {
  const [newListName, setNewListName] = React.useState("");

  function addItem() {
    const action = { type: "ADD_ITEM", value: newListName };
    props.dispatch(action);
    setNewListName("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Ma nouvelle liste de courses"
        onChangeText={text => setNewListName(text)}
        value={newListName}
      />
      <Button onPress={addItem} title="add"></Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center"
  },
  textInput: {
    width: "85%",
    backgroundColor: "#e3e3e3",
    color: "black",
    fontSize: 20
  }
});
