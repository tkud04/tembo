import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import TabBarIcon from '../components/TabBarIcon';
import CustomDrawerComponent from '../components/CustomDrawerComponent';
import AppStack from './AppStack';
import ProfileStack from './ProfileStack';

/////////////////////////////////////////////////

const ret = createDrawerNavigator(
  {
    Dashboard: {
		screen: AppStack
	},
	Profile: {
		screen: ProfileStack
	}
  },
  {
	  initialRouteName: 'Dashboard',
	  contentComponent: CustomDrawerComponent,
	  drawerOpenRoute: 'DrawerOpen',
	  drawerCloseRoute: 'DrawerClose',
	  drawerToggleRoute: 'DrawerToggle',
  }
);

export default ret;
