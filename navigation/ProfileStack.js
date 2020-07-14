import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';

/////////////////////////////////////////////////

const ret = createStackNavigator(
  {
    Profile: {
		screen: ProfileScreen,
		headerLeft: null,
	}
  },
);

export default ret;


const Stack = createStackNavigator();


let ProfileStack = () => (
<Stack.Navigator>
				<Stack.Screen
                  name="Profile"
	              component={ProfileScreen}
				  options={({route}) => ({
				  headerTransparent: true,
	             header: () => <AppHomeHeader xml={AppStyles.svg.chartBar}  r = {route} title="Tembo" subtitle="Profile"  sml={100}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />
				
                </Stack.Navigator>
);

export default ProfileStack;
