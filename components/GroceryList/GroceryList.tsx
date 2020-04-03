import React from "react";
import { View, StyleSheet, Image } from "react-native";
import InputNewItem from "./InputNewItem";
import List from "./List";
const backgroundImage = require("../../assets/background.png");

export default function GroceryList() {
  return (
    <View style={styles.container}>
      <Image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center"
        }}
        source={backgroundImage}
      />
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
