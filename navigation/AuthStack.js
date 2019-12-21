import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';

/////////////////////////////////////////////////

const ret = createStackNavigator(
  {
    'Sign in': {
		screen: SigninScreen
	},
	'Sign up': {
		screen: SignupScreen
	},
  },
);

export default ret;