import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Keychain from 'react-native-keychain';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import * as RootNavigation from './RootNavigation.js';
import { showMessage, hideMessage } from "react-native-flash-message";

//import RNPaystack from 'react-native-paystack';
//import {showMessage, hideMessage} from 'react-native-flash-message';
export const API = "https://tranquil-coast-18744.herokuapp.com/api";
export const currentNav = null;

export function tryParseJSON(jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") { 
            return o;
        }
    }
    catch (e) { }

    return false;
}

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key), ret = null;
  if (result) {
    ret = result;
  } else {
    //alert('No values stored under that key.');
  }
  return ret;
}

export async function remove(key) {
  await SecureStore.deleteItemAsync(key);
}

export function serializeJSON(data) {
  return Object.keys(data).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
}

export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

export async function registerForPushNotificationsAsync() {
  let token = "", cid = Constants.isDevice;

  if (cid) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
		  // alert(`In registerForPushNotificationsAsync(), finalStatus = ${finalStatus}`);
    if (finalStatus == 'granted') {
      Notifications.getExpoPushTokenAsync()
	  .then(data => {
		  //alert(`In getExpoPushTokenAsync(), data = ${data}`);
		  console.log(` data: `,data);
		  token = data.data;
		  	save('tembo_etk',token); 
	  })
	  .catch(err => {
		  alert(`In getExpoPushTokenAsync(), err = ${err}`);
	  });
    }
	else {
		alert('Failed to get push token for push notification!');
	}
    
    //console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  
  //alert(`In registerForPushNotificationsAsync(), token: ${token}`);
  return token;
}

export function findItem(l,x){
	console.log("[l,x]: ",[l,x]);
	return l.find(i => i.id == x);
}

export function wvParse(s){
	 let r = "";
	 const regex = /(html)|(device-width)/;
	 let sr = s.search(regex);
	   // console.log('sr: ',sr);
	 if(sr == -1){
		 r = `
		 <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  </head>
  <body style="max-width:100%; width:100%;background-color:white;">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
    <meta name="color-scheme" content="only" />
	${s}
	</body>
	</html>
		 `;
	 }
	 else{
		 r = s;
	 }
	 return r;
 }

export async function clearStorage(){
	await remove("tembo_current_u");
}
