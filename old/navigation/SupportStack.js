import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import SupportScreen from '../screens/SupportScreen';
//import PackageScreen from '../screens/PackageScreen';

/////////////////////////////////////////////////

const ret = createStackNavigator(
  {
    Support: {
		screen: SupportScreen
	}
  },
);

export default ret;
