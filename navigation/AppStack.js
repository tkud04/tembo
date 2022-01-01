import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen.js';
 
import HeaderBar from '../components/HeaderBar.js';
 
 
 const Stack = createStackNavigator();


function AppStack(){
  
	return (
	   <Stack.Navigator
	    initialRouteName="Home"	
		screenOptions={{
        headerTitle: (props) => <HeaderBar {...props} />
      }}
	  >
	   <Stack.Screen name="Home" component={HomeScreen} />
	   </Stack.Navigator>
	);
}


export default AppStack;
