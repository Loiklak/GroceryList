import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { groceryList } from "../../types/groceryListsType";

export default function GroceryListsList() {
  const [groceryListsList, setGroceryListsList] = React.useState<groceryList[]>(
    []
  );
  React.useEffect(() => {
    // Fetch groceryLists list
    setGroceryListsList([
      { name: "Ramens", icon: "🍜" },
      { name: "Salade de fruits", icon: "🍎" }
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Vos listes de course :</Text>
      <FlatList
        data={groceryListsList}
        renderItem={({ item }) => (
          <Text style={styles.listElement}>
            {item.icon} {item.name}
          </Text>
        )}
        keyExtractor={(item, index) => item.name}
      />
    </View>
  );
}

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
