import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import PackageScreen from '../screens/PackageScreen';
import SubscribeScreen from '../screens/SubscribeScreen';


/////////////////////////////////////////////////

const ret = createStackNavigator(
  {
	'Sign in': {
		screen: SigninScreen,
		headerLeft: null,
	},
	'Sign up': {
		screen: SignupScreen,
		headerLeft: null,
	},
	SelectPlan: {
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
