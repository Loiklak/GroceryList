import React from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Animated,
  TouchableOpacity,
  Alert
} from "react-native";
import { Input, Icon, Text, Overlay } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import GestureRecognizer from "react-native-swipe-gestures";

import { connect, ConnectedProps } from "react-redux";

import {
  quantityType,
  groceryListItem,
  reduxGroceryState,
  reduxGroceryAction
} from "../../types/groceryListsType";

const mapStateToProps = function(
  state: reduxGroceryState
): { groceryList: groceryListItem[] } {
  return {
    groceryList: state.groceryList
  };
};

type InputNewItemProps = ConnectedProps & {
  groceryList: groceryListItem[];
};

export default connect(mapStateToProps)(function InputNewItem(
  props: InputNewItemProps
) {
  const [newListName, setNewListName] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [quantityType, setQuantityType] = React.useState<quantityType | "">("");
  const [warningVisibility, setWarningVisibility] = React.useState(false);
  const [dropdownSize, setDropdownSize] = React.useState(
    new Animated.Value(230)
  );
  function toggleWindow() {
    const value = (dropdownSize as any)._value > 0 ? 0 : 230;
    Animated.timing(dropdownSize, {
      toValue: value,
      duration: 300
    }).start();
  }

  let qtyRef = React.useRef<Input>();
  let qtyTypeRef = React.useRef<HTMLElement>();

  const quantityTypes = [
    { value: "unité" },
    { value: "bouteille" },
    { value: "kg" },
    { value: "g" },
    { value: "L" },
    { value: "cL" }
  ];

  function flushInputs() {
    setNewListName("");
    setQuantity(0);
    setQuantityType("");
  }

  function addItem() {
    if (
      props.groceryList.reduce((accumulator, currValue) => {
        return accumulator || currValue.item.name == newListName;
      }, false)
    ) {
      handleAlreadyExistingItem();
    } else if (newListName != "" && quantity > 0) {
      Keyboard.dismiss();
      const action = {
        type: "ADD_ITEM",
        value: {
          item: {
            name: newListName,
            quantity: quantity,
            quantityType: quantityType
          },
          checked: false
        }
      };
      props.dispatch(action);
      flushInputs();
    } else {
      setWarningVisibility(true);
    }
  }

  function handleAlreadyExistingItem() {
    const redundantItem = props.groceryList.find(
      item => item.item.name == newListName
    );
    Alert.alert(
      "Cet article existe déjà",
      `Vous avez déjà ${redundantItem.item.name} dans votre liste, voulez vous augmenter la quantité de ${quantity} ${redundantItem.item.quantityType} ou annuler l'action ?`,
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Ajouter",
          onPress: () => {
            modifyQuantity(redundantItem, quantity);
            flushInputs();
          }
        }
      ],
      { cancelable: false }
    );
  }

  function modifyQuantity(listItem: groceryListItem, delta: number) {
    const action: reduxGroceryAction = {
      type: "MODIFY_GROCERY_ITEM",
      value: {
        ...listItem,
        item: { ...listItem.item, quantity: listItem.item.quantity + delta }
      }
    };
    props.dispatch(action);
  }

  function focusQtyType() {
    quantityType == "" && qtyTypeRef.current.focus();
  }

  function focusQty() {
    quantity == 0 && qtyRef.current.focus();
  }

  const gestureConfig = {
    // sensibilité à la vitesse pour détecter un swipe
    velocityThreshold: 0.3,
    // sensibilité de déplacer pour trancher entre un clic et un swipe
    gestureIsClickThreshold: 1,
    // déplacement max pour un swipe
    directionalOffsetThreshold: 100
  };

  return (
    <View style={styles.container}>
      <GestureRecognizer
        onSwipeUp={toggleWindow}
        onSwipeDown={toggleWindow}
        config={gestureConfig}
      >
        <TouchableOpacity onPress={toggleWindow}>
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              margin: 5
            }}
          >
            Nouvel article
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: dropdownSize,
            width: "auto",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            flexWrap: "wrap"
          }}
        >
          <Input
            placeholder="Nouvel article"
            onChangeText={text => setNewListName(text)}
            value={newListName}
            containerStyle={{ width: "100%" }}
            onSubmitEditing={focusQtyType}
          />
          <Dropdown
            ref={qtyTypeRef}
            label="Type de qté"
            data={quantityTypes}
            containerStyle={{ width: "95%" }}
            value={quantityType}
            onChangeText={text => {
              setQuantityType(text);
              setTimeout(() => focusQty(), 500);
            }}
          />
          <Input
            ref={qtyRef}
            placeholder="Quantité"
            onChangeText={text =>
              text == "" ? setQuantity(0) : setQuantity(parseInt(text))
            }
            keyboardType="numeric"
            value={quantity == 0 ? null : String(quantity)}
            containerStyle={{ width: "100%", marginBottom: 5 }}
            onSubmitEditing={addItem}
          />
          <View
            style={{
              width: "60%",
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Icon
              type="material"
              name="delete"
              color="#FF5B31"
              size={20}
              reverse
              onPress={flushInputs}
            />
            <Icon
              type="material"
              name="add"
              color="#82EB74"
              size={20}
              reverse
              onPress={addItem}
            />
          </View>
        </Animated.View>
      </GestureRecognizer>
      <Overlay
        isVisible={warningVisibility}
        onBackdropPress={() => setWarningVisibility(false)}
        width="75%"
        height="auto"
        overlayStyle={{ top: "-30%" }}
      >
        <Text>
          Rentrez le nom d'un article, une quantité et un type de quantité svp
        </Text>
      </Overlay>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "rgba(256, 256, 256, 0.96)",
    borderRadius: 10,
    margin: 5
  }
});
