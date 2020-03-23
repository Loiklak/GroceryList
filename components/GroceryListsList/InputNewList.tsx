import React from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default function InputNewList() {
  const [newListName, setNewListName] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Ma nouvelle liste de courses"
        onChangeText={text => setNewListName(text)}
        value={newListName}
      />
      <Button
        onPress={() => alert(`Nouvelle liste de course: ${newListName}`)}
        title="add"
      ></Button>
    </View>
  );
}

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
