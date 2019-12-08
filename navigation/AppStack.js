import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';
import CustomersScreen from '../screens/CustomersScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import EditCustomerScreen from '../screens/EditCustomerScreen';
import HomeScreen from '../screens/HomeScreen';
import SalesScreen from '../screens/SalesScreen';
import AddSaleScreen from '../screens/AddSaleScreen';
import SelectProductScreen from '../screens/SelectProductScreen';
import SelectCustomerScreen from '../screens/SelectCustomerScreen';
import EditSaleScreen from '../screens/EditSaleScreen';
import ReportsScreen from '../screens/ReportsScreen';

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
	EditProduct: {
		screen: EditProductScreen
	},
	Customers: {
		screen: CustomersScreen
	},
	AddCustomer: {
		screen: AddCustomerScreen
	},
	EditCustomer: {
		screen: EditCustomerScreen
	},
	Sales: {
		screen: SalesScreen
	},
	AddSale: {
		screen: AddSaleScreen
	},
	SelectProduct: {
		screen: SelectProductScreen
	},
	SelectCustomer: {
		screen: SelectCustomerScreen
	},
	EditSale: {
		screen: EditSaleScreen
	},
	Reports: {
		screen: ReportsScreen
	}
  },
);

export default ret;
