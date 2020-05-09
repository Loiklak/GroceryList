import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';

const mapStateToProps = (state) => {
  return {
    groceryList: state.groceryList,
  };
};

export default connect(mapStateToProps)(function List(props: any) {
  let finishedGroceries;
  if (
    props.groceryList.reduce((accumulator, currValue) => {
      accumulator && currValue.checked == true;
    }, true)
  ) {
    finishedGroceries = <Text h3>Vous avez fini vos course !</Text>;
  } else {
    finishedGroceries = <View></View>;
  }
  return <View style={styles.container}>{finishedGroceries}</View>;
});

const styles = StyleSheet.create({
  container: {},
});
