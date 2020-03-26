import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    groceryList: state.groceryList
  };
};

export default connect(mapStateToProps)(function List(props: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Vos listes de course :</Text>
      <FlatList
        data={props.groceryList}
        renderItem={({ item }) => (
          <Text style={styles.listElement}>{item}</Text>
        )}
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
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  }
});
