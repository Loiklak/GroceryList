import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import InputNewItem from './InputNewItem';
import List from './List';

export default function GroceryList(): React.ReactNode {
  return (
    <View style={styles.container}>
      <Image
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
        source={{ uri: '../../assets/background.png' }}
      />
      <InputNewItem />
      <List style={styles.list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
