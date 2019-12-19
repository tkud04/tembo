import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CustomDrawerComponent from '../components/CustomDrawerComponent';
import SvgIcon from '../components/SvgIcon';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';

import SubscribeStack from './SubscribeStack';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

/////////////////////////////////////////////////

let user = {};
helpers.getLoggedInUser((u) => {user = u});

let userMenu = {
    Dashboard: {
		screen: AppStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardArea)} w={40} h={20}/>    
		}
	},
	Subscribe: {
		screen: SubscribeStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardWallet)} w={40} h={20}/>    
		}
	},
	'Sign in': {
		screen: AuthStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardUsers)} w={40} h={20}/>    
		}
	}
  }	

const GuestNavigator = createDrawerNavigator(
  userMenu,
  {
	  initialRouteName: 'Dashboard',
	  contentComponent: (props) => (<CustomDrawerComponent {...props}/>),
	  /**contentOptions:{
		items: () =>  
	  },**/
	  drawerOpenRoute: 'DrawerOpen',
	  drawerCloseRoute: 'DrawerClose',
	  drawerToggleRoute: 'DrawerToggle',
  }
);

export default GuestNavigator;
