import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import AppTransparentHeader from '../components/AppTransparentHeader';
import AppTransparentInputHeader from '../components/AppTransparentInputHeader';
import AppStyles from '../styles/AppStyles';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
/**
import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';
import CustomersScreen from '../screens/CustomersScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import EditCustomerScreen from '../screens/EditCustomerScreen';

import SalesScreen from '../screens/SalesScreen';
import AddSaleScreen from '../screens/AddSaleScreen';
import SelectProductScreen from '../screens/SelectProductScreen';
import SelectProductFinalScreen from '../screens/SelectProductFinalScreen';
import SelectCustomerScreen from '../screens/SelectCustomerScreen';
import EditSaleScreen from '../screens/EditSaleScreen';
import ReportsScreen from '../screens/ReportsScreen';
import ReportsDatePickerScreen from '../screens/ReportsDatePickerScreen';
import TablesScreen from '../screens/TablesScreen';
import ChartsScreen from '../screens/ChartsScreen';
**/
/////////////////////////////////////////////////

const Stack = createStackNavigator();


let AppStack = () => (
<Stack.Navigator>
				<Stack.Screen
                  name="Home"
	              component={HomeScreen}
				  options={({route}) => ({
				  headerTransparent: true,
	             header: () => <AppHomeHeader xml={AppStyles.svg.chartBar}  r = {route} title="Tembo" subtitle="Home"  sml={100}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />
				<Stack.Screen
                  name="Profile"
	              component={ProfileScreen}
				  options={({route}) => ({
				  headerStyle: {
		            backgroundColor: AppStyles.mainButtonBackground,
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="Tembo" hnb={false} subtitle="Profile"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null   
				  })}
	              
                /> 	
                </Stack.Navigator>
);

export default AppStack;
