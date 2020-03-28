import React from "react";
import { View, StyleSheet } from "react-native";
import InputNewItem from "./InputNewItem";
import List from "./List";

export default function GroceryList() {
  return (
    <View style={styles.container}>
      <InputNewItem />
      <List style={styles.list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1
  }
});
