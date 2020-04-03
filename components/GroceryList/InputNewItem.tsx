import React from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Animated,
  TouchableOpacity,
  Alert
} from "react-native";
import { Input, Icon, Text, Overlay, Divider } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import GestureRecognizer from "react-native-swipe-gestures";
import { connect, ConnectedProps } from "react-redux";
import {
  quantityType,
  groceryListItem,
  reduxGroceryState,
  reduxGroceryAction
} from "../../types/groceryListsType";

// Props and redux
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
  const [newArticle, setNewArticle] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [quantityType, setQuantityType] = React.useState<quantityType | "">("");
  const [warningVisibility, setWarningVisibility] = React.useState(false);
  const [dropdownSize, setDropdownSize] = React.useState(
    new Animated.Value(230)
  );
  function toggleWindow() {
    const value = (dropdownSize as any)._value > 0 ? 0 : 230;
    (dropdownSize as any)._value == 0 && focusArticleName();
    Animated.timing(dropdownSize, {
      toValue: value,
      duration: 300
    }).start();
  }

  let qtyRef = React.useRef<Input>();
  let qtyTypeRef = React.useRef<HTMLElement>();
  let articleRef = React.useRef<Input>();

  const quantityTypes = [
    { value: "unité" },
    { value: "bouteille" },
    { value: "kg" },
    { value: "g" },
    { value: "L" },
    { value: "cL" }
  ];

  function flushInputs() {
    setNewArticle("");
    setQuantity(0);
    setQuantityType("");
  }

  function addItem() {
    if (
      props.groceryList.reduce((accumulator, currValue) => {
        return accumulator || currValue.item.name == newArticle;
      }, false)
    ) {
      handleAlreadyExistingItem();
    } else if (newArticle != "" && quantity > 0) {
      Keyboard.dismiss();
      const action = {
        type: "ADD_ITEM",
        value: {
          item: {
            name: newArticle,
            quantity: quantity,
            quantityType: quantityType
          },
          checked: false,
          index: props.groceryList.length
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
      item => item.item.name == newArticle
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

  function focusArticleName() {
    newArticle == "" && articleRef.current.focus();
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
        <TouchableOpacity onPress={toggleWindow} style={styles.header}>
          <Text style={styles.headerText}>Nouvel article</Text>
        </TouchableOpacity>
        <Divider />
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
            ref={articleRef}
            placeholder="Nouvel article"
            onChangeText={text => setNewArticle(text)}
            value={newArticle}
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
          <View style={styles.iconsBar}>
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
  },
  header: {
    backgroundColor: "white",
    borderRadius: 10
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    margin: 5
  },
  iconsBar: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
