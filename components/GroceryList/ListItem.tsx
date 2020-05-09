import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import ListItemOptions from './ListItemOptions';

import {
  groceryListItem,
  reduxGroceryAction,
} from '../../types/groceryListsType';

type ListItemProps = {
  listItem: groceryListItem;
  addLiftDrop: (newLiftDrop: () => void) => void;
  dispatch: (action: reduxGroceryAction) => void;
};

export default connect()(function ListItem(props: ListItemProps) {
  function formatGroceryName(item: groceryListItem) {
    const accordEnNombre = item.item.quantity > 1 ? 's' : '';
    const quantity =
      item.item.quantityType == 'unité'
        ? `${item.item.quantity}`
        : `${item.item.quantity} ${item.item.quantityType} de`;
    return `${quantity} ${item.item.name}`;
  }

  const [dropdownSize, setDropdownSize] = React.useState(new Animated.Value(0));
  function dropOptions() {
    props.addLiftDrop(liftOptions);
    Animated.timing(dropdownSize, {
      toValue: 60,
      duration: 300,
    }).start();
  }
  function liftOptions() {
    Animated.timing(dropdownSize, {
      toValue: 0,
      duration: 200,
    }).start();
  }

  function deleteItem() {
    const action = {
      type: 'DELETE_ITEM',
      value: props.listItem,
    };
    props.dispatch(action);
  }

  function toggleCheck() {
    const action = {
      type: 'TOGGLE_CHECK',
      value: props.listItem,
    };
    props.dispatch(action);
    liftOptions();
  }

  function modifyQuantity(newQuantity: number) {
    if (newQuantity >= 0) {
      const action: reduxGroceryAction = {
        type: 'MODIFY_GROCERY_ITEM',
        value: {
          ...props.listItem,
          item: { ...props.listItem.item, quantity: newQuantity },
        },
      };
      props.dispatch(action);
    }
  }

  function moveItem(direction: 'up' | 'down') {
    const actionType: string =
      direction == 'up' ? 'MOVE_ITEM_UP' : 'MOVE_ITEM_DOWN';
    const action: reduxGroceryAction = {
      type: actionType,
      value: props.listItem,
    };
    props.dispatch(action);
  }

  return (
    <View style={styles.container}>
      <CheckBox
        title={formatGroceryName(props.listItem)}
        checked={props.listItem.checked}
        //onLongPress={deleteItem(props.listItem.item.name)}
        onLongPress={dropOptions}
        onPress={toggleCheck}
        containerStyle={{ marginTop: 5, marginBottom: 0 }}
      />
      <Animated.View
        style={{
          alignItems: 'center',
          width: '94%',
          //backgroundColor: "aqua",
          marginLeft: 'auto',
          marginRight: 'auto',
          height: dropdownSize,
          overflow: 'hidden',
        }}
      >
        <ListItemOptions
          deleteItem={deleteItem}
          modifyQuantity={modifyQuantity}
          moveItem={moveItem}
          quantity={props.listItem.item.quantity}
        />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "green"
  },
});
