import React, { ReactNode } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Input, Tooltip, Icon, Text, Overlay } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";

import { connect } from "react-redux";

import { quantityType } from "../../types/groceryListsType";

export default connect()(function InputNewItem(props: any) {
  const [newListName, setNewListName] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [quantityType, setQuantityType] = React.useState<quantityType>("unité");
  const [warningVisibility, setWarningVisibility] = React.useState(false);

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
      setQuantityType("unité");
    } else {
      setWarningVisibility(true);
    }
  }

  function focusQtyType() {
    qtyTypeRef.current.focus();
  }

  function focusQty() {
    qtyRef.current.focus();
  }

  return (
    <View style={styles.container}>
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
        containerStyle={{ width: "auto", minWidth: "100%" }}
        onSubmitEditing={addItem}
      />
      <Icon
        type="font-awesome"
        name="plus-square"
        color="#b8eb9b"
        size={20}
        reverse
        onPress={addItem}
      />
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flexWrap: "wrap",
    marginTop: 10
  }
});
