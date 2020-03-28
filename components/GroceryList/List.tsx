import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Text, CheckBox } from "react-native-elements";

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

  function toggleCheck(item) {
    return () => {
      const action = { type: "TOGGLE_CHECK", value: item };
      props.dispatch(action);
    };
  }

  return (
    <View style={styles.container}>
      <Text h4 style={{ textAlign: "center", marginBottom: 5 }}>
        Liste
      </Text>
      {props.groceryList
        .sort((a: any, b: any) => {
          return a.checked ? 1 : b.checked ? -1 : 0;
        })
        .map((l, i) => (
          <CheckBox
            key={i}
            title={l.name}
            checked={l.checked}
            onLongPress={deleteItem(l.name)}
            onPress={toggleCheck(l.name)}
          />
        ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10
  }
});
