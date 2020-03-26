import React from "react";
import { View, StyleSheet } from "react-native";
import InputNewItem from "./InputNewItem";
import List from "./List";

export default function GroceryList() {
  return (
    <View>
      <InputNewItem />
      <List />
    </View>
  );
}

const styles = StyleSheet.create({});
