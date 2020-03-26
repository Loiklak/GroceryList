import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    groceryList: state.groceryList
  };
};

export default connect(mapStateToProps)(function List(props: any) {
  function deleteItem(item) {
    return () => {
      const action = { type: "DELETE_ITEM", value: item };
      props.dispatch(action);
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ce que tu dois acheter :</Text>
      <FlatList
        data={props.groceryList}
        renderItem={({ item }) => (
          <View style={styles.listElement}>
            <Text style={styles.textListElement}>- {item}</Text>
            <Text onPress={deleteItem(item)} style={styles.textListElement}>
              ❌
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => "key" + index}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10
  },
  label: {
    fontSize: 25,
    marginBottom: 10
  },
  listElement: {
    marginTop: 5,
    marginBottom: 5,
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#d1d1d1",
    borderRadius: 5
  },
  textListElement: {
    fontSize: 25
  }
});
