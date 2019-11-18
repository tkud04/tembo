import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';

/////////////////////////////////////////////////

const ret = createStackNavigator(
  {
    Profile: {
		screen: ProfileScreen
	}
  },
);

export default ret;
