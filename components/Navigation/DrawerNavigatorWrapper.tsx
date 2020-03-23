import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

// import NavigationHeader from "./NavigationHeader";
import { openDrawer } from "./NavigationService";

const Stack = createStackNavigator();

/**
 * Wraps the component in a stack navigator to have a header
 * @param {string} screenName : Title on the header of the component
 * @param {React.ComponentType} component : React component to be rendered
 */
export default function(
  screenName: string,
  component: React.ComponentType
): React.ComponentType {
  return function DrawerNavigatorWrapper() {
    return (
      <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name={screenName}
          component={component}
          options={{
            title: screenName,
            headerTitleAlign: "center",
            headerLeft: () => (
              <Text
                style={{ fontSize: 20, padding: 10 }}
                onPress={() => openDrawer()}
              >
                Menu
              </Text>
            )
            /* If you want to set a handmade header :
             header: NavigationHeader
             */
          }}
        />
      </Stack.Navigator>
    );
  };
}
