import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import * as SplashScreen from 'expo-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import { navigationRef } from './RootNavigation.js';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

import SplashScreen from './components/SplashScreen.js';
import { UserProvider } from './contexts/UserContext';

import AuthStack from './navigation/AuthStack';
import ProfileStack from './navigation/ProfileStack';
import AppStack from './navigation/AppStack';
import SettingsStack from './navigation/SettingsStack';

import * as Notifications from 'expo-notifications';
import * as helpers from './Helpers'; 

const Tab = createMaterialTopTabNavigator();
 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App() { 
	const [isAppReady, setIsAppReady] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [tk, setTk] = useState(null);
	const [u, setU] = useState(null);
	
	const [etk, setEtk] = useState('');
	const [online, setOnline] = useState(false);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  let s = null, nm = "", ntt = "";

  const subscribeToNetworkChanges = NetInfo.addEventListener(state => {
  s = state.isInternetReachable;
    if(s != online){
	  setOnline(s);
	  if(!s){
		 nm = "Your device is offline", ntt = "danger";
	  }
	   showMessage({
            message: nm,
            type: ntt,
          });
    }
});


	let ctx = {
				loggedIn: loggedIn,
				setLoggedIn: setLoggedIn,
				etk: etk,
				setEtk: setEtk,
				tk: tk,
				setTk: setTk,
				u: u,
				setU: setU,
				online: online,
				setOnline: setOnline
			};
	
	useEffect(() => {
    async function prepare() {
      try {
        //make any API calls you need to do here
        //await Font.loadAsync(Entypo.font);
		let ttk = await helpers.getValueFor("ace_tk");
		let uu = null, credentials = null;
		
		
		try {
    // Retrieve the credentials
    credentials = await helpers.getCredentials();
    if(credentials)
   {
      uu = credentials.username;
      console.log(`Credentials successfully loaded for user ${uu}`);
      
      if(ttk != null && uu != null){
			setTk(ttk);
			 setU(uu);
		    setLoggedIn(true);
		}
    }
    else
    {
       console.log('No credentials stored');
    }
  }
 catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }

		
		
		
		
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
		
		
		try{
		  // To unsubscribe to these update, just use:
          subscribeToNetworkChanges();
		}
		catch(e){
		  console.warn(e);
		}
	
		
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);
  
  useEffect(() => {
	  if(online){
    helpers.registerForPushNotificationsAsync().then(token => {
		//alert('About to get push token for push notification!');
	
		//alert(`etk in registerForPushNotificationsAsync: ${token}`);
		});

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('response: ',response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
	  }
  }, [online]);
  

  if (!isAppReady) {
    return (
	  <SplashScreen/>
	);
  }
   let irn = loggedIn ? "AppStack" : "AuthStack";
  return (
     <UserProvider value={ctx}>
	 <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
	    initialRouteName={irn}
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#694fad' }}
        		
	  >
	  {loggedIn ? (
	  <>
	  <Tab.Screen
        name="AppStack"
        component={AppStack}
        options={{
          tabBarLabel: 'Dashboard',  
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={26} />
          ),
        }}
      />
	  <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-box" color={color} size={26} />
          ),
        }}
      />
	  <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-cog" color={color} size={26} />
          ),
        }}
      />
	  </>
	  ) : (
	   <Tab.Screen
        name="AuthStack"
        component={AuthStack}
        options={{
          tabBarLabel: 'Sign in',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
	  )}
       
      </Tab.Navigator>
	  </NavigationContainer>
      <FlashMessage position="bottom" /> 
     </UserProvider>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  transparent: {
    opacity: 0
  },
});

