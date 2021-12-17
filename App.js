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
import InboxStack from './navigation/InboxStack';
import DraftsStack from './navigation/DraftsStack';
import SentStack from './navigation/SentStack';
import MoreStack from './navigation/MoreStack';

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
  const [noNetworkAlerted, setNoNetworkAlerted] = useState(false);
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
				setOnline: setOnline,
				noNetworkAlerted: noNetworkAlerted,
				setNoNetworkAlerted: setNoNetworkAlerted
			};
	
	useEffect(() => {
    async function prepare() {
      try {
        //make any API calls you need to do here
        //await Font.loadAsync(Entypo.font);
		let ttk = await helpers.getValueFor("ace_tk");
		let uu = await helpers.getValueFor("ace_u");
		
		
		
		if(ttk != null && uu != null){
			setTk(ttk);
			 setU(uu);
		    setLoggedIn(true);
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
   let irn = loggedIn ? "InboxStack" : "AuthStack";
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
        name="InboxStack"
        component={InboxStack}
        options={{
          tabBarLabel: 'Inbox',  
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="inbox" color={color} size={26} />
          ),
        }}
      />
	  <Tab.Screen
        name="DraftsStack"
        component={DraftsStack}
        options={{
          tabBarLabel: 'Drafts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="email-edit" color={color} size={26} />
          ),
        }}
      />
	  <Tab.Screen
        name="SentStack"
        component={SentStack}
        options={{
          tabBarLabel: 'Sent',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="email-send" color={color} size={26} />
          ),
        }}
      />
	  <Tab.Screen
        name="MoreStack"
        component={MoreStack}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="menu" color={color} size={26} />
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

