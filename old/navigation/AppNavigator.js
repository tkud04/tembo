import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CustomDrawerComponent from '../components/CustomDrawerComponent';
import SvgIcon from '../components/SvgIcon';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';

import SubscribeStack from './SubscribeStack';
import SupportStack from './SupportStack';
import AppStack from './AppStack';
import ProfileStack from './ProfileStack';
import SignoutStack from './SignoutStack';

/////////////////////////////////////////////////

let user = {};

let userMenu = {};

userMenu = {
    Dashboard: {
		screen: AppStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardArea)} w={40} h={20}/>    
		}
	},
	Profile: {
		screen: ProfileStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardUsers)} w={40} h={20}/>    
		}
	},
	'Sign out': {
		screen: SignoutStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardUsers)} w={40} h={20}/>    
		}
	},
	Support: {
		screen: SupportStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardLightbulb)} w={40} h={20}/>    
		}
	},
  }

const AppNavigator = createDrawerNavigator(
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

export default AppNavigator;
