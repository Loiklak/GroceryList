import React from "react";
import { View, StyleSheet } from "react-native";
import List from "./List";
import InputNewList from "./InputNewList";

export default function GroceryListsList() {
  return (
    <View style={styles.container}>
      <InputNewList />
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
});
