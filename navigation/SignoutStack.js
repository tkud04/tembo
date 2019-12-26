import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import SignoutScreen from '../screens/SignoutScreen';


/////////////////////////////////////////////////

const ret = createStackNavigator(
  {
	'Sign out': {
		screen: SignoutScreen,
		headerLeft: null,
	},
  },
);

export default ret;
