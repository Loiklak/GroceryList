import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Icon, Divider } from "react-native-elements";
import ListItem from "./ListItem";

import { connect, ConnectedProps } from "react-redux";
import {
  groceryListItem,
  reduxGroceryState
} from "../../types/groceryListsType";

const mapStateToProps = function(
  state: reduxGroceryState
): { groceryList: groceryListItem[] } {
  return {
    groceryList: state.groceryList
  };
};

type ListProps = ConnectedProps & {
  groceryList: groceryListItem[];
};

export default connect(mapStateToProps)(function List(props: ListProps) {
  const [liftDropList, setLiftDropList] = React.useState([]);
  function liftDrops() {
    liftDropList.forEach(liftDrop => liftDrop());
    setLiftDropList([]);
  }
  function addLiftDrop(newLiftDrop) {
    if (liftDropList.length > 0) {
      liftDrops();
    }
    setLiftDropList([...liftDropList, newLiftDrop]);
  }

  function flushItems() {
    Alert.alert(
      "Attention",
      "Êtes vous sûr.e de vouloir supprimer toute votre liste de course ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Confirmer",
          onPress: () => {
            const action = {
              type: "DELETE_ALL",
              value: {}
            };
            props.dispatch(action);
          }
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <TouchableWithoutFeedback onPress={liftDrops}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1, paddingLeft: 10 }} />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
                margin: 5,
                fontSize: 30
              }}
            >
              Liste
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              paddingRight: 10
            }}
          >
            <Icon
              type="material"
              name="delete"
              color="gray"
              size={20}
              reverse
              onPress={flushItems}
              style={{ marginRight: 10 }}
            />
          </View>
        </View>
        <Divider />
        <ScrollView>
          {props.groceryList
            .sort((a: groceryListItem, b: groceryListItem) => b.index - a.index)
            .sort((a: groceryListItem, b: groceryListItem) => {
              return a.checked ? 1 : b.checked ? -1 : 0;
            })
            .map((l: groceryListItem) => (
              <ListItem
                listItem={l}
                key={l.item.name}
                addLiftDrop={addLiftDrop}
              />
            ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
    backgroundColor: "rgba(256, 256, 256, 0.9)",
    borderRadius: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "center"
  }
});
