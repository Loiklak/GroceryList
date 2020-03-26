import "react-native-gesture-handler"; // Always import it first with react navigation

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Helper functions
import CustomNavigationDrawer from "./CustomNavigationDrawer"; // Pimped drawer menu
import DrawerNavigationWrapper from "./DrawerNavigatorWrapper"; // Wrap component in a stack navigator to have page header
import { navigationRef } from "./NavigationService"; // Allow access to top drawer navigator in all the app
import { NavigatorProps } from "./NavigationTypes";

const Drawer = createDrawerNavigator();

export default function Navigator(props: NavigatorProps) {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomNavigationDrawer {...props} />} // Optional
      >
        {props.pages.map(element => (
          <Drawer.Screen
            name={element.name}
            component={DrawerNavigationWrapper(element.name, element.component)}
            key={element.name}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
