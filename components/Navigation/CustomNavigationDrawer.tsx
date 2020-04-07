import React from 'react';
import { Alert } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

export default function CustomDrawerContent(props: any): JSX.Element {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* Here we added an element to our Drawer list */}
      <DrawerItem
        label="Help"
        onPress={(): void =>
          Alert.alert('Contact', 'mail: loic.chau@student-cs.fr')
        }
      />
    </DrawerContentScrollView>
  );
}
