import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import AppStyles from '../styles/AppStyles';
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import PackageScreen from '../screens/PackageScreen';
import SubscribeScreen from '../screens/SubscribeScreen';


////////////////////////////////////////////////

const Stack = createStackNavigator();


let AuthStack = () => (
<Stack.Navigator>
				<Stack.Screen
                  name="Signin"
	              component={SigninScreen}
				  options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="Tembo" hnb={true} subtitle="Sign in"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />
				<Stack.Screen
                  name="Signup"
	              component={SignupScreen}
				  options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="Tembo" subtitle="Sign up"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />

				<Stack.Screen
                  name="Package"
	              component={PackageScreen}
				   options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="Tembo" subtitle="Choose package"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 
				<Stack.Screen
                  name="Subscribe"
	              component={SubscribeScreen}				  
				  //initialParams={{goBack: () => {this.props.navigation.goBack()}}}
				  options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="Tembo" subtitle="Subscribe"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />
                </Stack.Navigator>
);

export default AuthStack;
