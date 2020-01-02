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
import SelectProductFinalScreen from '../screens/SelectProductFinalScreen';
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
		screen: ProductsScreen,
		headerLeft: null,

	},
	AddProduct: {
		screen: AddProductScreen,
		headerLeft: null,
	},
	EditProduct: {
		screen: EditProductScreen,
		headerLeft: null,
	},
	Customers: {
		screen: CustomersScreen,
		headerLeft: null,
	},
	AddCustomer: {
		screen: AddCustomerScreen,
		headerLeft: null,
	},
	EditCustomer: {
		screen: EditCustomerScreen,
		headerLeft: null,
	},
	Sales: {
		screen: SalesScreen,
		headerLeft: null,
	},
	AddSale: {
		screen: AddSaleScreen,
		headerLeft: null,
	},
	SelectProduct: {
		screen: SelectProductScreen,
		headerLeft: null,
	},
	SelectProductFinal: {
		screen: SelectProductFinalScreen,
		headerLeft: null,
	},
	SelectCustomer: {
		screen: SelectCustomerScreen,
		headerLeft: null,
	},
	EditSale: {
		screen: EditSaleScreen,
		headerLeft: null,
	},
	Reports: {
		screen: ReportsScreen,
		headerLeft: null,
	}
  },
);

export default ret;
