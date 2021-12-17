import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import SubscribeScreen from '../screens/SubscribeScreen';
import PackageScreen from '../screens/PackageScreen';

/////////////////////////////////////////////////

const ret = createStackNavigator(
  {
    Subscribe: {
		screen: SubscribeScreen,
		headerLeft: null,
	},
	Package: {
		screen: PackageScreen,
		headerLeft: null,
	},
  },
);

export default ret;
