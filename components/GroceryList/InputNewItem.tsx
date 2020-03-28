import React from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Animated,
  TouchableOpacity
} from "react-native";
import { Input, Icon, Text, Overlay } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";

import { connect } from "react-redux";

import { quantityType } from "../../types/groceryListsType";

export default connect()(function InputNewItem(props: any) {
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

  function addItem() {
    if (newListName != "" && quantity > 0) {
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
      setNewListName("");
      setQuantity(0);
      setQuantityType("");
    } else {
      setWarningVisibility(true);
    }
  }

  function focusQtyType() {
    quantityType == "" && qtyTypeRef.current.focus();
  }

  function focusQty() {
    quantity == 0 && qtyRef.current.focus();
  }

  return (
    <View style={styles.container}>
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
        <Icon
          type="material"
          name="add"
          color="#b8eb9b"
          size={20}
          reverse
          onPress={addItem}
        />
      </Animated.View>
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
