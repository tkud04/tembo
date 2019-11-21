import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CustomersScreen from '../screens/CustomersScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import HomeScreen from '../screens/HomeScreen';

/////////////////////////////////////////////////

const ret = createStackNavigator(
  {
    Home: {
		screen: HomeScreen
	},
	Products: {
		screen: ProductsScreen
	},
	AddProduct: {
		screen: AddProductScreen
	},
	Customers: {
		screen: CustomersScreen
	},
	AddCustomer: {
		screen: AddCustomerScreen
	}
  },
);

export default ret;
