/** Service to access the toplevel navigator anywhere in the app */

import React from 'react';
import { DrawerActions } from '@react-navigation/native';

/** Reference to the most top-level navigator */
export const navigationRef = React.createRef<any>();

/** Open drawer of the most top-level navigator if it is a drawer one */
export function openDrawer(): void {
  navigationRef.current.dispatch(DrawerActions.openDrawer());
}
