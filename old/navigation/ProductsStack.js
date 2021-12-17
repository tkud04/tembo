import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';

/////////////////////////////////////////////////

const ret = createStackNavigator(
  {
    Products: {
		screen: ProductsScreen
	},
	'Add Product': {
		screen: AddProductScreen
	},
	
  },
);

export default ret;
