import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import TabBarIcon from '../components/TabBarIcon';
import WebScreen from '../screens/WebScreen';
import TestScreen from '../screens/TestScreen';
import Test2Screen from '../screens/Test2Screen';

/////////////////////////////////////////////////

const ret = createDrawerNavigator(
  {
    Home: {
		screen: Test2Screen
	},
	Test: {
		screen: TestScreen
	}
  },
);

export default ret;
